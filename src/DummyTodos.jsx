import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./components/Table";
import Pagination from "./components/Pagination";


function DummyTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;
  const navigate = useNavigate();

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching dummy todos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handleEdit = (id) => {
    const newTitle = prompt("Enter new title for the todo:");
    if (newTitle) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleAddToMyTodos = (todo) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    const isAlreadyAdded = storedTodos.some((t) => t.task === todo.title);
    if (isAlreadyAdded) {
      alert("Todo is already added!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      task: todo.title,
      userId: loggedInUser.email,
    };

    localStorage.setItem("todos", JSON.stringify([...storedTodos, newTodo]));
    alert("Todo added successfully!");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Dummy Todos</h2>
        <button onClick={() => navigate("/users")} className="btn btn-secondary">
          Back to Todos
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table
            headers={["User ID", "ID", "Title", "Completed", "Actions"]}
            data={currentTodos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAddToMyTodos}
          />
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}

export default DummyTodos;

