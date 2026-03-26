import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://smartplus.onrender.com/api";

function Dashboard({ setPage }) {
  const [groups, setGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchGroups();
    fetchExpenses();
  }, []);

  const fetchGroups = async () => {
    const res = await axios.get(`${API}/groups`, { headers });
    setGroups(res.data);
  };

  const fetchExpenses = async () => {
    const res = await axios.get(`${API}/expenses`, { headers });
    setExpenses(res.data);
  };

  const createGroup = async () => {
    await axios.post(`${API}/groups`, { name: groupName }, { headers });
    setGroupName("");
    fetchGroups();
  };

  const addExpense = async () => {
    await axios.post(
      `${API}/expenses`,
      {
        groupId: groups[0]?.groupId,
        amount,
        splitType: "equal",
        category: "general",
        date: new Date(),
      },
      { headers }
    );
    setAmount("");
    fetchExpenses();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div className="container">
      <h1>💸 Smart+ Dashboard</h1>
      <button onClick={logout}>Logout</button>

      <div className="card">
        <h2>Create Group</h2>
        <input value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        <button onClick={createGroup}>Add Group</button>
      </div>

      <div className="card">
        <h2>Groups</h2>
        {groups.map((g) => (
          <div key={g.groupId} className="item">{g.name}</div>
        ))}
      </div>

      <div className="card">
        <h2>Add Expense</h2>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="card">
        <h2>Expenses</h2>
        {expenses.map((e) => (
          <div key={e.expenseId} className="item">₹{e.amount}</div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;