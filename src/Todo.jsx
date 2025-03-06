import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo, setTodos } from "./TodoReducer";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    dispatch(setTodos(storedTodos));
  }, [dispatch]);

  const todos = useSelector((state) =>
    state.todo.filter((t) => t.userId === user.email)
  );

  const handleAddOrUpdate = () => {
    if (task.trim()) {
      if (editId) {
        dispatch(updateTodo({ id: editId, task }));
        setEditId(null);
      } else {
        const newTodo = { id: Date.now(), task, userId: user.email };
        dispatch(addTodo(newTodo));
      }
      setTask("");
    }
  };

  const handleEdit = (todo) => {
    setTask(todo.task);
    setEditId(todo.id);
  };

  return (
    <div className="container mt-4">
      <h2>My Todos</h2>
      <div className="d-flex gap-2 mt-4">
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button className="btn btn-primary" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <tr key={todo.id}>
                  <td>{index + 1}</td>
                  <td>{todo.task}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No todos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todo;
