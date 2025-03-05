import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "./UserReducer";

function Users() {
  const users = useSelector((state) => state.user) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.email !== "vishesh@gmail.com") {
      navigate("/todo");
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
    window.location.reload();
  };

  return isAdmin ? (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Users List</h2>
      </div>

      <Link to="/create" className="btn btn-success my-3">Create +</Link>

      {error && <p className="text-danger">{error}</p>}

      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index}>
                <td>{user.id || index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.email === "vishesh@gmail.com" ? "Admin" : "User"}</td>
                <td>
                  <Link to={`/edit/${user.id}`} className="btn btn-sm btn-primary">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No users found.</p>
      )}
    </div>
  ) : null;
}

export default Users;
