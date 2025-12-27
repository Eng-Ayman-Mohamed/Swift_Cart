import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/profile/Profile.css";
import ProfileHeader from "../components/profile/ProfileHeader";
import InfoSection from "../components/profile/InfoSection";
import InfoItem from "../components/profile/InfoItem";
import QuickActions from "../components/profile/QuickActions";
import { deleteUser } from "../services/api";
import { useAuth } from "../hooks/useStorage";

export default function Profile({ user }) {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) {
    return (
      <div className="card form">
        <h3>No user signed in</h3>
        <p className="small">Please sign in to view your profile.</p>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteUser(user._id);
      if (result.ok) {
        // Clear localStorage and reload the page
        localStorage.removeItem("cs_user_id");
        localStorage.removeItem("cs_user");
        setAuthUser(null);
        window.location.reload();
      } else {
        alert("Failed to delete account: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete account error:", error);
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="card form profile-container">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Personal Information Section */}
      <InfoSection title="Personal Information" icon="📋">
        <div className="info-grid">
          <InfoItem label="Full name" value={user.name} variant="default" />
          <InfoItem label="Email" value={user.email} variant="purple" />
          {user.phone && (
            <InfoItem label="Phone" value={user.phone} variant="pink" />
          )}
          {user.address && (
            <InfoItem label="Address" value={user.address} variant="green" />
          )}
        </div>
      </InfoSection>

      {/* Account Activity Section */}
      <InfoSection title="Account Activity" icon="⏰" variant="purple">
        <div className="activity-item">
          <span className="activity-label">Member since:</span>
          <strong className="activity-value">
            {new Date().toLocaleDateString()}
          </strong>
        </div>
        <div className="activity-item">
          <span className="activity-label">Account status:</span>
          <strong className="activity-status">✓ Active</strong>
        </div>
      </InfoSection>

      {/* Avatar Settings Section */}
      <InfoSection title="Avatar Settings" icon="🎨" variant="pink">
        <div className="avatar-preview">
          <div className="avatar-preview-info">
            <h4>Avatar type:</h4>
            <p>
              <strong>
                {user.avatar
                  ? "📷 Custom Image"
                  : user.avatarEmoji
                  ? `😊 Emoji (${user.avatarEmoji})`
                  : "🎨 Color"}
              </strong>
            </p>
          </div>
        </div>
        {user.avatarColor && !user.avatar && (
          <div className="color-indicator">
            <span className="color-indicator-label">Color:</span>
            <div
              className="color-dot"
              style={{ background: user.avatarColor }}
            />
          </div>
        )}
      </InfoSection>
      {/* Quick Actions */}
      <QuickActions navigate={navigate} />
      {/* Danger Zone Section */}
      <InfoSection title="Danger Zone" icon="⚠️" variant="red">
        <div className="danger-zone">
          <h4>Delete Account</h4>
          <p className="small">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          {!showDeleteConfirm ? (
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
            >
              Delete Account
            </button>
          ) : (
            <div className="delete-confirmation">
              <p>
                <strong>Are you absolutely sure?</strong>
              </p>
              <p className="small">
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </p>
              <div className="delete-actions">
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Yes, delete my account"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </InfoSection>
    </div>
  );
}
