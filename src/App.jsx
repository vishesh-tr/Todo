import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllTodos from "./AllTodos";
import Navbar from "./components/Navbar";
import Create from "./Create";
import DummyTodos from "./DummyTodos";
import EditProfile from "./EditProfile";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./Signup";
import Todo from "./Todo";
import TodoAuth from "./TodoAuth";
import Update from "./Update";
import Users from "./Users";

const avatars = [
  new URL("./assets/vishesh.png", import.meta.url).href,
  new URL("./assets/user.png", import.meta.url).href,
  new URL("./assets/user1.png", import.meta.url).href,
  new URL("./assets/user2.png", import.meta.url).href,
  new URL("./assets/user3.png", import.meta.url).href,
  new URL("./assets/user4.png", import.meta.url).href,
];

function App() {
  const { navigate } = useNavigate();
  const [user, setUser] = useState({
    email: "",
    role: "",
    name: "",
    password: "",
    avatar: "",
  });
  // const user = JSON.parse(localStorage.getItem("loggedInUser"));
  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
    // window.location.reload();
  };

  return (
    <>
      {localStorage.getItem("loggedInUser") && (
        <Navbar user={user} avatars={avatars} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo-auth/:userId"
          element={
            <ProtectedRoute>
              <TodoAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-todos"
          element={
            <ProtectedRoute>
              <AllTodos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dummy-todos"
          element={
            <ProtectedRoute>
              <DummyTodos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile avatars={avatars} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
