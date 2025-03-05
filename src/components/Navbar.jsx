import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ProfileModal from "./ProfileModal";

const vishesh = new URL("../assets/vishesh.png", import.meta.url).href;
const user = new URL("../assets/user.png", import.meta.url).href;
const user1 = new URL("../assets/user1.png", import.meta.url).href;
const user2 = new URL("../assets/user2.png", import.meta.url).href;
const user3 = new URL("../assets/user3.png", import.meta.url).href;
const user4 = new URL("../assets/user4.png", import.meta.url).href;

function Navbar({ user, handleLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.email === "vishesh@gmail.com";

  const storedImage = localStorage.getItem("profileImage");

  const defaultImages = { admin: vishesh, user, user1, user2, user3, user4 };

  const userImage = storedImage || (isAdmin ? defaultImages.admin : defaultImages.user);

  const appTitle = user ? `Todo App (${isAdmin ? "Admin" : "User"})` : "Todo App";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand">{appTitle}</span>

        {user && (
          <DropdownMenu
            user={user}
            userImage={userImage}
            navigate={navigate}
            handleLogout={handleLogout}
            setProfileOpen={setProfileOpen}
          />
        )}
      </div>

      {profileOpen && (
        <ProfileModal user={user} userImage={userImage} onClose={() => setProfileOpen(false)} />
      )}
    </nav>
  );
}

export default Navbar;
