import api from "./api";

// Create task
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// Get all tasks (Admin)
export const getAllTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

// Get my tasks (Employee)
export const getMyTasks = async () => {
  const response = await api.get("/tasks/mytasks");
  return response.data;
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  const response = await api.put(`/tasks/${taskId}/status`, { status });
  return response.data;
};

// Get task by ID
export const getTaskById = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

// Update task
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
