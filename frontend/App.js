import React, { useState } from "react";
import "./index.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const API = "https://smartplus.onrender.com";

  const register = async () => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setMsg(data.msg);
  };

  const login = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setMsg(data.token ? "Login success ✅" : data.msg);
  };

  return (
    <div className="container">
      <h1>💸 Smart+ Expense Tracker</h1>

      <div className="card">
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="buttons">
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>

        <p>{msg}</p>
      </div>
    </div>
  );
}

export default App;