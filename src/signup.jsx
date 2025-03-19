import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    if (users.some((user) => user.email === email)) {
      setError("Email already exists! Please login.");
      return;
    }

    
    const newUser = { name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Signup successful! You can now log in.");

    navigate("/login");
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-25 border p-4 bg-light">
        <h3>Signup</h3>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Signup</button>
        </form>
        <p className="mt-3">
          Already have an account?  
          <button className="btn btn-link p-0" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
