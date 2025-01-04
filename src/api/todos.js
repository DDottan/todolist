import apiClient from './api';

export const fetchTodos = async () => {
  const response = await apiClient.get('/todo');
  return response.data;
};

export const fetchTodoById = async (id) => {
  const response = await apiClient.get(`/todo/${id}`);
  return response.data;
};

export const createTodo = async (data) => {
  const response = await apiClient.post('/todo', data);
  return response.data;
};

export const updateTodo = async (id, data) => {
  const response = await apiClient.put(`/todo/${id}`, data);
  return response.data;
};

export const patchTodo = async (id, data) => {
    const response = await apiClient.patch(`/todo/${id}`, data);
    return response.data;
};  

export const deleteTodo = async (id) => {
  const response = await apiClient.delete(`/todo/${id}`);
  return response.data;
};