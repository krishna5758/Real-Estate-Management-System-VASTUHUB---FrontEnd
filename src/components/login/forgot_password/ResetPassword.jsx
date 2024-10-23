import axios from "axios";
import React, { useState } from "react";
import { FaKey, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ResetPassword.css';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!token)
      newErrors.token = "Token is required";

    // Password validation
    if (!newPassword)
      newErrors.newPassword = "Password is required";
    else if (newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/.test(newPassword))
      newErrors.newPassword = "Password must contain at least one number and one special character.";

    // Confirm password validation
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8088/api/auth/reset-password?token=${(token)}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.status === 409) {
        alert(data.message);
        console.log(data.message);
      }
      else if (response.ok) {
        alert(data.message);

        setToken('');
        setNewPassword('');
        setConfirmPassword('');

        if (data.message === "Password updated Successfully!") {
          navigate('/login');
        }
      }

    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }

  };

  return (
    <div className="resetBoxMain">
      <div className="resetBox">
        <img className="user-reset"
          src="https://icons.iconarchive.com/icons/dapino/people/256/brown-man-icon.png"></img>

        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter your token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required />

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required />

          <input
            type="password"
            placeholder="Enter Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required />

          <button className="reset-password" type="submit">Reset Password</button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;