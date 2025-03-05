import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./UserReducer";
import { v4 as uuidv4 } from "uuid"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const users = useSelector((state) => state.user) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      toast.error("⚠️ Email already exists!", { position: "top-center" });
      return;
    }

    const newUser = {
      id: uuidv4(), 
      name,
      email,
      password,
      isAdmin: false, 
    };

    
    dispatch(addUser(newUser));
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("✅ User created successfully!", { position: "top-center" });

    navigate("/users"); 
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5 shadow-lg rounded">
        <h3 className="text-center mb-3">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
