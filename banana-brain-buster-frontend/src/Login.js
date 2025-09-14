import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegistering ? "http://localhost:5000/api/register" : "http://localhost:5000/api/login";

        try {
            const response = await axios.post(url, { username, password });
            if (!isRegistering) {
                onLogin(response.data.token);
            }
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{isRegistering ? "Register" : "Login"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: "5px", margin: "5px" }}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "5px", margin: "5px" }}
                />
                <br />
                <button type="submit" style={{ padding: "5px 10px", margin: "10px" }}>
                    {isRegistering ? "Register" : "Login"}
                </button>
            </form>
            <p>{message}</p>
            <button onClick={() => setIsRegistering(!isRegistering)} style={{ marginTop: "10px" }}>
                {isRegistering ? "Go to Login" : "Create an Account"}
            </button>
        </div>
    );
}

export default Login;
