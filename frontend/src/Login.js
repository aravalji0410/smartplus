import { useState } from "react";
import axios from "axios";

const API = "https://smartplus.onrender.com/api";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>

        <p onClick={() => setPage("register")} style={{ cursor: "pointer" }}>
          Don't have account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;