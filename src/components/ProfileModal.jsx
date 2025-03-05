import React from "react";

function ProfileModal({ user, userImage, onClose }) {
  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Profile</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <img src={userImage} alt="Profile" className="rounded-circle mb-2" style={{ width: "80px", height: "80px" }} />
            <h5>{user?.name}</h5>
            <p>{user?.email}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
