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

  // Fetch Groups
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

  // Fetch Expenses
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

  useEffect(() => {
    if (token) {
      fetchGroups();
      fetchExpenses();
    }
  }, [token]);

  // Create Group
  const createGroup = async () => {
    if (!groupName) return alert("Enter group name");

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

  // Add Expense
  const addExpense = async () => {
    if (!amount || groups.length === 0) {
      return alert("Add group first!");
    }

    try {
      await axios.post(
        `${API}/expenses`,
        {
          groupId: groups[0].groupId,
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
      <h1>💸 Smart+ Expense Manager</h1>

      {!token && (
        <div className="card warning">
          ⚠️ No token found. Please login first.
        </div>
      )}

      {/* Create Group */}
      <div className="card">
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={createGroup}>Create Group</button>
      </div>

      {/* Groups */}
      <div className="card">
        <h2>Your Groups</h2>
        {groups.length === 0 ? (
          <p>No groups yet</p>
        ) : (
          groups.map((g) => (
            <div key={g.groupId} className="item">
              {g.name}
            </div>
          ))
        )}
      </div>

      {/* Add Expense */}
      <div className="card">
        <h2>Add Expense</h2>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      {/* Expenses */}
      <div className="card">
        <h2>Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          expenses.map((e) => (
            <div key={e.expenseId} className="item">
              ₹{e.amount} • {e.category}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;