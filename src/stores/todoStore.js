import { create } from 'zustand';
import { fetchTodos, fetchTodoById, createTodo, updateTodo, patchTodo, deleteTodo } from '../api/todos';

const useTodoStore = create((set) => ({
  todos: [],
  selectedTodo: null,
  loading: false,
  error: null,
  fetchAllTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await fetchTodos();
      console.log('fetchAllTodos', todos);
      set({ todos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchTodoDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const todo = await fetchTodoById(id);
      set({ selectedTodo: todo, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createNewTodo: async (data) => {
    set({ loading: true, error: null });
    try {
      await createTodo(data);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  updateExistingTodo: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateTodo(id, data);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  patchExistingTodo: async (id, currentStatus) => {
    set({ loading: true, error: null });
    try {
      const updatedTodo = await patchTodo(id, { completed: !currentStatus }); // 상태 반전 전달
      set({ selectedTodo: updatedTodo, loading: false }); // 상태 업데이트
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  deleteExistingTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTodo(id);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));

export default useTodoStore;