import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setError("Invalid email or password!");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful! Redirecting...");
    navigate("/todo");
    window.location.reload();
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-25 border p-4 bg-light">
        <h3>Login</h3>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
          <button type="button" className="btn btn-success w-100" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
