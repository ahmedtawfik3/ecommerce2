"use client";
import { useState } from "react";
import { changePassword } from "../../../services/auth";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await changePassword({ currentPassword, password: newPassword, rePassword });
      alert("Password changed successfully");
    } catch (err) {
      console.log(err);
      alert("Change failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Change Password</h1>
      <input placeholder="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      <input placeholder="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <input placeholder="Re-Password" type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
      <button type="submit">Change</button>
    </form>
  );
}
