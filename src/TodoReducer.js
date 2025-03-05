import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    addTodo: (state, action) => {
      const updatedState = [...state, action.payload];
      localStorage.setItem("todos", JSON.stringify(updatedState));
      return updatedState;
    },
    deleteTodo: (state, action) => {
      const updatedTodos = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    },
    updateTodo: (state, action) => {
      const updatedTodos = state.map(todo => todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;




