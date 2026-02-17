"use client";
import { useState } from "react";
import { forgotPassword } from "../../../services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Check your email for reset code!");
    } catch (err) {
      console.log(err);
      alert("Failed to send reset code");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Reset Code</button>
      {message && <p>{message}</p>}
    </form>
  );
}
