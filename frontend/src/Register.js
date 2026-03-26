import { useState } from "react";
import axios from "axios";

const API = "https://smartplus.onrender.com/api";

function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(`${API}/auth/register`, {
        email,
        password,
      });

      alert("Registered successfully!");
      setPage("login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>

        <p onClick={() => setPage("login")} style={{ cursor: "pointer" }}>
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;