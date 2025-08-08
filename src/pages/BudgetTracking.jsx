import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import jsPDF from "jspdf";
import { DarkModeContext } from "@/context/DarkModeContext"; // ✅ Import dark mode context

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6363"];

const BudgetTracking = () => {
  const { darkMode } = useContext(DarkModeContext); // ✅ Get dark mode state

  const [totalBudget, setTotalBudget] = useState(1000);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const categories = ["Accommodation", "Transport", "Food", "Sightseeing", "Shopping", "Miscellaneous"];

  const addExpense = () => {
    if (!category || !amount) return alert("Please enter category and amount!");
    if (parseFloat(amount) > totalBudget - getTotalSpent()) return alert("⚠️ Budget limit exceeded!");

    setExpenses([...expenses, { category, amount: parseFloat(amount) }]);
    setCategory("");
    setAmount("");
  };

  const getTotalSpent = () => expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const getRemainingBudget = () => totalBudget - getTotalSpent();

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("💰 Travel Budget Report", 20, 20);
    doc.text(`Total Budget: ₹${totalBudget}`, 20, 30);
    doc.text(`Total Spent: ₹${getTotalSpent()}`, 20, 40);
    doc.text(`Remaining Budget: ₹${getRemainingBudget()}`, 20, 50);
    
    let y = 60;
    doc.text("Expenses Breakdown:", 20, y);
    expenses.forEach(expense => {
      y += 10;
      doc.text(`${expense.category}: ₹${expense.amount}`, 20, y);
    });

    doc.save("budget-report.pdf");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-6 max-w-3xl mx-auto shadow-lg rounded-lg`}>
      <h2 className="text-2xl font-bold text-center mb-6">💰 Budget Tracker</h2>

      {/* Budget Input */}
      <div className="mb-4">
        <label className="text-lg font-semibold">Total Budget (₹):</label>
        <Input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
          className="mt-2"
        />
      </div>

      {/* Expense Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-50"} border p-2 rounded-md w-full md:w-1/2`}
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <Input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full md:w-1/2"
        />
        <Button onClick={addExpense} className="bg-green-500 text-white">➕ Add</Button>
      </div>

      {/* Budget Overview */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4 rounded-lg shadow mb-6`}>
        <h3 className="text-lg font-semibold">📊 Budget Summary</h3>
        <p>Total Budget: <strong>₹{totalBudget}</strong></p>
        <p>Total Spent: <strong>₹{getTotalSpent()}</strong></p>
        <p className={`text-lg font-semibold ${getRemainingBudget() < 100 ? "text-red-500" : "text-green-500"}`}>
          Remaining: ₹{getRemainingBudget()}
        </p>
      </div>

      {/* Expense Pie Chart */}
      {expenses.length > 0 && (
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow mb-6`}>
          <h3 className="text-lg font-semibold">📊 Expense Breakdown</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={expenses}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {expenses.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}

      {/* Download Report */}
      <Button onClick={generateReport} className="w-full bg-blue-500 text-white py-3 text-lg">
        📄 Download Budget Report
      </Button>
    </div>
  );
};

export default BudgetTracking;
