import React, { useState, useEffect } from "react";
import { getMyTasks, updateTaskStatus } from "../services/taskService";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getMyTasks();
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setSuccess("");
      setError("");
      await updateTaskStatus(taskId, newStatus);
      setSuccess("Task status updated successfully!");
      fetchTasks(); // Refresh tasks
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task status");
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
      <h1>Employee Dashboard</h1>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

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

      {/* Tasks List */}
      <div style={styles.tasksSection}>
        <h2>My Tasks</h2>
        {tasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No tasks assigned to you yet.</p>
          </div>
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
                    <strong>Assigned By:</strong> {task.assignedBy?.name}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div style={styles.statusUpdate}>
                  <label style={styles.label}>Update Status:</label>
                  <div style={styles.statusButtons}>
                    <button
                      onClick={() => handleStatusChange(task._id, "Pending")}
                      disabled={task.status === "Pending"}
                      style={{
                        ...styles.statusBtn,
                        backgroundColor:
                          task.status === "Pending" ? "#95a5a6" : "#e67e22",
                      }}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(task._id, "In Progress")
                      }
                      disabled={task.status === "In Progress"}
                      style={{
                        ...styles.statusBtn,
                        backgroundColor:
                          task.status === "In Progress" ? "#95a5a6" : "#3498db",
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(task._id, "Completed")}
                      disabled={task.status === "Completed"}
                      style={{
                        ...styles.statusBtn,
                        backgroundColor:
                          task.status === "Completed" ? "#95a5a6" : "#27ae60",
                      }}
                    >
                      Completed
                    </button>
                  </div>
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
  tasksSection: {
    marginTop: "2rem",
  },
  emptyState: {
    backgroundColor: "white",
    padding: "3rem",
    borderRadius: "8px",
    textAlign: "center",
    color: "#7f8c8d",
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
    marginBottom: "1rem",
  },
  statusUpdate: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #ecf0f1",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#2c3e50",
    fontWeight: "500",
  },
  statusButtons: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  statusBtn: {
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
};

export default EmployeeDashboard;
