import React, { useState, useEffect } from "react";
import { getAllTasks } from "../services/taskService";
import { getEmployees } from "../services/authService";
import { createTask } from "../services/taskService";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksResponse, employeesResponse] = await Promise.all([
        getAllTasks(),
        getEmployees(),
      ]);
      setTasks(tasksResponse.data);
      setEmployees(employeesResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    try {
      await createTask(formData);
      setFormSuccess("Task created successfully!");
      setFormData({ title: "", description: "", assignedTo: "" });
      setShowCreateForm(false);
      fetchData(); // Refresh tasks
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create task");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#e67e22";
      case "In Progress":
        return "#3498db";
      case "Completed":
        return "#27ae60";
      default:
        return "#95a5a6";
    }
  };

  const getStatusCount = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={styles.createBtn}
        >
          {showCreateForm ? "Cancel" : "Create New Task"}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {formSuccess && <div style={styles.success}>{formSuccess}</div>}

      {/* Task Statistics */}
      <div style={styles.statsContainer}>
        <div style={{ ...styles.statCard, borderLeft: "4px solid #3498db" }}>
          <h3>Total Tasks</h3>
          <p style={styles.statNumber}>{tasks.length}</p>
        </div>
        <div style={{ ...styles.statCard, borderLeft: "4px solid #e67e22" }}>
          <h3>Pending</h3>
          <p style={styles.statNumber}>{getStatusCount("Pending")}</p>
        </div>
        <div style={{ ...styles.statCard, borderLeft: "4px solid #3498db" }}>
          <h3>In Progress</h3>
          <p style={styles.statNumber}>{getStatusCount("In Progress")}</p>
        </div>
        <div style={{ ...styles.statCard, borderLeft: "4px solid #27ae60" }}>
          <h3>Completed</h3>
          <p style={styles.statNumber}>{getStatusCount("Completed")}</p>
        </div>
      </div>

      {/* Create Task Form */}
      {showCreateForm && (
        <div style={styles.formCard}>
          <h2>Create New Task</h2>
          {formError && <div style={styles.error}>{formError}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Task Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={styles.input}
                placeholder="Enter task title"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                style={{ ...styles.input, minHeight: "100px" }}
                placeholder="Enter task description"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Assign To *</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                required
                style={styles.input}
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name} ({employee.email})
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" style={styles.submitBtn}>
              Create Task
            </button>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div style={styles.tasksSection}>
        <h2>All Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create your first task!</p>
        ) : (
          <div style={styles.tasksList}>
            {tasks.map((task) => (
              <div key={task._id} style={styles.taskCard}>
                <div style={styles.taskHeader}>
                  <h3>{task.title}</h3>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(task.status),
                    }}
                  >
                    {task.status}
                  </span>
                </div>
                <p style={styles.taskDescription}>{task.description}</p>
                <div style={styles.taskMeta}>
                  <p>
                    <strong>Assigned To:</strong> {task.assignedTo?.name}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  createBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  success: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  statCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2c3e50",
    margin: "0.5rem 0 0 0",
  },
  formCard: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#2c3e50",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  submitBtn: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  tasksSection: {
    marginTop: "2rem",
  },
  tasksList: {
    display: "grid",
    gap: "1rem",
  },
  taskCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  statusBadge: {
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  taskDescription: {
    color: "#7f8c8d",
    marginBottom: "1rem",
  },
  taskMeta: {
    color: "#95a5a6",
    fontSize: "0.875rem",
  },
};

export default AdminDashboard;
