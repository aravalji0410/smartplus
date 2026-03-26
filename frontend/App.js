import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [groups, setGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const API = "https://smartplus.onrender.com/api";

  useEffect(() => {
    if (token) {
      fetchGroups();
      fetchExpenses();
    }
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createGroup = async () => {
    try {
      await axios.post(
        `${API}/groups`,
        { name: groupName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroupName("");
      fetchGroups();
    } catch (err) {
      console.log(err);
    }
  };

  const addExpense = async () => {
    try {
      await axios.post(
        `${API}/expenses`,
        {
          groupId: groups[0]?.groupId,
          amount,
          splitType: "equal",
          category: "general",
          date: new Date(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount("");
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>💸 Smart+ Dashboard</h1>

      {!token && <p>Please add token in console</p>}

      <div className="card">
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={createGroup}>Add Group</button>
      </div>

      <div className="card">
        <h2>Groups</h2>
        {groups.map((g) => (
          <div key={g.groupId} className="item">
            {g.name}
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Add Expense</h2>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="card">
        <h2>Expenses</h2>
        {expenses.map((e) => (
          <div key={e.expenseId} className="item">
            ₹{e.amount}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;