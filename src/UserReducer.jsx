import { createSlice } from "@reduxjs/toolkit";

const loadUsers = () => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUsers(),
  reducers: {
    addUser: (state, action) => {  
      state.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state));
    },
    updateUser: (state, action) => {  
      const { id, name, email, password, image } = action.payload;
      const index = state.findIndex((user) => user.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], name, email, password, image };
        localStorage.setItem("users", JSON.stringify(state));
      }
    },
    deleteUser: (state, action) => {
      const updatedState = state.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
