import React, { useState } from "react";

const API = "https://smartplus.onrender.com"; 

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");

  const login = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setToken(data.token);
    alert("Login success");
  };

  const createGroup = async () => {
    await fetch(`${API}/api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ name: groupName }),
    });
    getGroups();
  };

  const getGroups = async () => {
    const res = await fetch(`${API}/api/groups`, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setGroups(data);
  };

  const addExpense = async () => {
    await fetch(`${API}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        amount,
        groupId: groups[0]?.groupId,
        splitType: "equal",
        category: "food",
        date: new Date(),
      }),
    });
    getExpenses();
  };

  const getExpenses = async () => {
    const res = await fetch(`${API}/api/expenses`, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setExpenses(data);
  };

  return (
    <div className="container">
      <h1>💸 Smart Expense App</h1>

      {/* LOGIN */}
      <div className="card">
        <h3>Login</h3>
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>

      {/* GROUPS */}
      <div className="card">
        <h3>Groups</h3>
        <input placeholder="Group name" onChange={(e)=>setGroupName(e.target.value)} />
        <div>
          <button onClick={createGroup}>Create</button>
          <button className="outline" onClick={getGroups}>Load</button>
        </div>

        <ul>
          {groups.map((g) => (
            <li key={g.groupId}>👥 {g.name}</li>
          ))}
        </ul>
      </div>

      {/* EXPENSES */}
      <div className="card">
        <h3>Expenses</h3>
        <input placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />
        <div>
          <button onClick={addExpense}>Add</button>
          <button className="outline" onClick={getExpenses}>Load</button>
        </div>

        <ul>
          {expenses.map((e) => (
            <li key={e.expenseId}>💰 ${e.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;