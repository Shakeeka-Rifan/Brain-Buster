import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Login.css";
import { ArrowLeftCircle } from "lucide-react";
import bananaHumanIcon from "../assets/images/banana-human.png";
import { loginUser } from "../services/authApi"; // Import API function

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);

      console.log("API Response:", res.data); // Debugging log

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username); // Ensure username is returned


      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back, player!",
        icon: "success",
        confirmButtonText: "Start Game",
      });

      navigate("/mainmenu");
    } catch (err) {
      Swal.fire({
        title: "Access Denied!",
        text: "Invalid username or password. Try again!",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="login-container">
      <button className="go-back-button" onClick={() => navigate("/")}>
        <ArrowLeftCircle size={32} color="white" />
      </button>
      <div className="overlay"></div>
      <img src={bananaHumanIcon} alt="Banana Human" className="banana-icons" />
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="cartoonic-button-3d">Login</button>
        </form>
        <p className="signup-text">Don't have an account?</p>
        <span className="spans" onClick={() => navigate("/signup")}>Sign Up</span>
      </div>
    </div>
  );
}

export default Login;
