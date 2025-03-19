import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "./UserReducer";


function EditProfile(props) {
  const { avatars } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const [name, setName] = useState(loggedInUser.name || "");
  const [email, setEmail] = useState(loggedInUser.email || "");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [image, setImage] = useState(loggedInUser.avatar);

  useEffect(() => {
    if (image) {
      localStorage.setItem("profileImage", image);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const selectedImage = avatars[e.target.value];
    setImage(selectedImage);
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const index = savedUsers.findIndex(
      (user) => user.email === loggedInUser.email
    );
    savedUsers[index].avatar = selectedImage;
    loggedInUser.avatar = selectedImage;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    localStorage.setItem("users", JSON.stringify(savedUsers));
  };

  const handleUpdate = (e, field) => {
    e.preventDefault();

    if (field === "password" && oldPassword !== loggedInUser.password) {
      alert("Incorrect old password!");
      return;
    }

    const updatedUser = { ...loggedInUser, image };
    if (field === "name") updatedUser.name = name;
    if (field === "email") updatedUser.email = email;
    if (field === "password") updatedUser.password = password;

    dispatch(updateUser(updatedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center">Edit Profile</h2>

        <div className="text-center">
          <img
            src={loggedInUser.avatar}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px" }}
          />
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <select
              className="form-control"
              defaultValue={Object.keys(avatars).find(
                (key) => avatars[key] === image
              )}
              onChange={handleImageChange}
            >
              {Object.keys(avatars).map((key) => (
                <option key={key} value={key}>
                  {key}.png
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button
              className="btn btn-primary mt-2 w-100"
              onClick={(e) => handleUpdate(e, "name")}
            >
              Update Name
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="btn btn-primary mt-2 w-100"
              onClick={(e) => handleUpdate(e, "email")}
            >
              Update Email
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2 w-100"
              onClick={(e) => handleUpdate(e, "password")}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
