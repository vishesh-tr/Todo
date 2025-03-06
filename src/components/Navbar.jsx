import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ProfileModal from "./ProfileModal";

function Navbar(props) {
  const { user, handleLogout } = props;
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const appTitle = user
    ? `Todo App (${user.role === "admin" ? "Admin" : "User"})`
    : "Todo App";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand">{appTitle}</span>

        {user && (
          <DropdownMenu
            user={user}
            userImage={user.avatar}
            navigate={navigate}
            handleLogout={handleLogout}
            setProfileOpen={setProfileOpen}
          />
        )}
      </div>

      {profileOpen && (
        <ProfileModal
          user={user}
          userImage={user.avatar}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
