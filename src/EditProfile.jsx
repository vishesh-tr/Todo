import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "./UserReducer";

const images = {
  vishesh: new URL("../assets/vishesh.png", import.meta.url).href,
  user: new URL("../assets/user.png", import.meta.url).href,
  user1: new URL("../assets/user1.png", import.meta.url).href,
  user2: new URL("../assets/user2.png", import.meta.url).href,
  user3: new URL("../assets/user3.png", import.meta.url).href,
  user4: new URL("../assets/user4.png", import.meta.url).href,
};

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const storedImage = localStorage.getItem("profileImage");

  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [image, setImage] = useState(storedImage || images.user);

  useEffect(() => {
    if (image) {
      localStorage.setItem("profileImage", image);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const selectedImage = images[e.target.value];
    setImage(selectedImage);
    localStorage.setItem("profileImage", selectedImage);
  };

  const handleUpdate = (e, field) => {
    e.preventDefault();
    
    if (field === "password" && oldPassword !== storedUser.password) {
      alert("Incorrect old password!");
      return;
    }

    const updatedUser = { ...storedUser, image };
    if (field === "name") updatedUser.name = name;
    if (field === "email") updatedUser.email = email;
    if (field === "password") updatedUser.password = password;

    dispatch(updateUser(updatedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    localStorage.setItem("profileImage", image);

    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center">Edit Profile</h2>
        
        <div className="text-center">
          <img 
            src={image} 
            alt="Profile" 
            className="rounded-circle mb-3" 
            style={{ width: "100px", height: "100px" }} 
          />
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <select className="form-control" value={Object.keys(images).find(key => images[key] === image)} onChange={handleImageChange}>
              {Object.keys(images).map((key) => (
                <option key={key} value={key}>{key}.png</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            <button className="btn btn-primary mt-2 w-100" onClick={(e) => handleUpdate(e, "name")}>Update Name</button>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="btn btn-primary mt-2 w-100" onClick={(e) => handleUpdate(e, "email")}>Update Email</button>
          </div>

          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary mt-2 w-100" onClick={(e) => handleUpdate(e, "password")}>Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
