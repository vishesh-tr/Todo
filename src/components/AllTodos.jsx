import React, { useEffect, useState } from "react";

function AllTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">All Todos</h2>
      <div className="list-group mt-3">
        {todos.map((todo) => (
          <div key={todo.id} className="list-group-item d-flex justify-content-between">
            <span>{todo.title}</span>
            <span className={todo.completed ? "badge bg-success" : "badge bg-warning"}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTodos;
