import React, { useState, useMemo } from "react";

export default function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2026-04-02", amount: 1200, category: "Food", type: "expense" },
    { id: 3, date: "2026-04-03", amount: 800, category: "Transport", type: "expense" },
    { id: 4, date: "2026-04-04", amount: 2000, category: "Freelance", type: "income" }
  ]);

  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  const income = useMemo(() =>
    transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const expense = useMemo(() =>
    transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const balance = income - expense;

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const addTransaction = () => {
    const newTx = {
      id: Date.now(),
      date: "2026-04-05",
      amount: Math.floor(Math.random() * 1000),
      category: "Misc",
      type: "expense"
    };
    setTransactions([...transactions, newTx]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>💰 Finance Dashboard</h1>

      {/* Role Selector */}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      {/* Summary */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ border: "1px solid", padding: "10px" }}>Balance: ₹{balance}</div>
        <div style={{ border: "1px solid", padding: "10px" }}>Income: ₹{income}</div>
        <div style={{ border: "1px solid", padding: "10px" }}>Expense: ₹{expense}</div>
      </div>

      {/* Transactions */}
      <h2 style={{ marginTop: "20px" }}>Transactions</h2>

      <input
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        {filtered.map((tx) => (
          <div key={tx.id} style={{ border: "1px solid", padding: "10px", marginTop: "5px" }}>
            {tx.date} | {tx.category} | ₹{tx.amount} | {tx.type}
          </div>
        ))}
      </div>

      {/* Admin Button */}
      {role === "admin" && (
        <button onClick={addTransaction} style={{ marginTop: "10px" }}>
          Add Transaction
        </button>
      )}

      {/* Insights */}
      <h2 style={{ marginTop: "20px" }}>Insights</h2>
      <p>
        Highest Expense:{" "}
        {
          transactions
            .filter(t => t.type === "expense")
            .sort((a, b) => b.amount - a.amount)[0]?.category
        }
      </p>
      <p>Total Transactions: {transactions.length}</p>
    </div>
  );
}