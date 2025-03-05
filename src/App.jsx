import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./Create";
import Update from "./Update";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import Todo from "./Todo";
import TodoAuth from "./TodoAuth";
import Users from "./Users";
import AllTodos from "./AllTodos";
import DummyTodos from "./DummyTodos";
import Navbar from "./components/Navbar";
import EditProfile from "./EditProfile"; 

function App() {
  const user = JSON.parse(localStorage.getItem("loggedInUser")); 

  return (
    <BrowserRouter>
      {user && <Navbar user={user} />} 

      <Routes>
        <Route path="/" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><Update /></ProtectedRoute>} />
        <Route path="/todo-auth/:userId" element={<ProtectedRoute><TodoAuth /></ProtectedRoute>} />
        <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/all-todos" element={<ProtectedRoute><AllTodos /></ProtectedRoute>} />
        <Route path="/dummy-todos" element={<ProtectedRoute><DummyTodos /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
