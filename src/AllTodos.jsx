import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllTodos() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    
    if (!loggedInUser || loggedInUser.email !== "vishesh@gmail.com") {
      navigate("/todo");
      return;
    }

    
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    
    const validUserEmails = storedUsers.map((user) => user.email);
    const filteredTodos = storedTodos.filter((todo) => validUserEmails.includes(todo.userId));

    setTodos(filteredTodos);
    setUsers(storedUsers);
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Users' Todos</h2>
      <button onClick={() => navigate("/users")} className="btn btn-secondary mb-3">
        Back to Users
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Todo</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            const user = users.find((u) => u.email === todo.userId);
            return (
              <tr key={todo.id}>
                <td>{index + 1}</td> 
                <td>{user ? user.name : "Unknown"}</td> 
                <td>{todo.userId}</td>
                <td>{todo.userId === "vishesh@gmail.com" ? "Admin" : "User"}</td>
                <td>{todo.task}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllTodos;

