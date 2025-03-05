import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TodoAuth() {
  const { userId } = useParams(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.id === parseInt(userId) && u.email === email && u.password === password);

    if (user) {
      navigate(`/todo/${userId}`); 
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Enter Credentials to View Todos</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Verify & Continue</button>
      </form>
    </div>
  );
}

export default TodoAuth;








