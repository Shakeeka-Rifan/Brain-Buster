import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import Swal from "sweetalert2";
import { ArrowLeftCircle } from "lucide-react";
import bananaHumanIcon from "../assets/images/banana-human.png";
import { registerUser } from "../services/authApi"; // Import API function

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password);

      Swal.fire({
        title: "Account Created!",
        text: "Welcome! Please log in to continue.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        title: "Signup Failed!",
        text: "Username already exists. Please try another.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="signup-container">
      <button className="go-back-button" onClick={() => navigate("/")}>
        <ArrowLeftCircle size={32} color="white" />
      </button>
      <div className="overlay"></div>
      <img src={bananaHumanIcon} alt="Banana Human" className="banana-icons" />
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="cartoonic-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="cartoonic-input"
          />
          <button type="submit" className="cartoonic-button-3d">Sign Up</button>
        </form>
        <p className="login-text">Already have an account?</p>
        <span className="span" onClick={() => navigate("/login")}>Log In</span>
      </div>
    </div>
  );
}

export default Signup;
