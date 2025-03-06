import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DropdownMenu({ user, userImage, setProfileOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout Function
  const handleLogoutClick = () => {
    localStorage.removeItem("loggedInUser");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="position-relative">
      {/* Profile Image Button */}
      <button
        className="btn btn-secondary d-flex align-items-center"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={userImage}
          alt="Profile"
          className="rounded-circle me-2"
          style={{ width: "30px", height: "30px" }}
        />
        Profile
      </button>

      {dropdownOpen && (
        <div className="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow bg-white rounded">
          {/* Profile Button */}
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={() => navigate("/edit-profile")}
          >
            <img
              src={userImage}
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
            />
            Edit Profile
          </button>

          <div className="dropdown-divider"></div>

          {/* Dummy Todos Button */}
          <button
            onClick={() => navigate("/dummy-todos")}
            className="dropdown-item"
          >
            Dummy Todos
          </button>

          {/* Admin-Only Buttons */}
          {user.role === "admin" && (
            <>
              <button
                onClick={() => navigate("/users")}
                className="dropdown-item"
              >
                Users
              </button>
              <button
                onClick={() => navigate("/all-todos")}
                className="dropdown-item"
              >
                All Todos
              </button>
            </>
          )}

          <div className="dropdown-divider"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="dropdown-item text-danger"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
