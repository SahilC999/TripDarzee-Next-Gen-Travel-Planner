
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext"; // ✅ Correct path
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Home() {
  const { darkMode } = useContext(DarkModeContext); // ✅ Get dark mode state

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex flex-col items-center justify-center p-6`}>
      <div className={`${darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-lg"} rounded-lg p-6 max-w-3xl w-full text-center`}>
        <h1 className="text-3xl font-bold mb-4">Welcome to Travel Planner 🌍✈️</h1>
        <p className="text-lg mb-6">Plan your trips, pack smart, and explore with ease!</p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/create-trip">
            <Button className="w-full py-3 text-lg">➕ Create Trip</Button>
          </Link>
          <Link to="/my-trip">
            <Button className="w-full py-3 text-lg">📅 My Trips</Button>
          </Link>
          <Link to="/flights">
            <Button className="w-full py-3 text-lg">🔍 Search Flights & Hotels</Button>
          </Link>
          <Link to="/packing-list">
            <Button className="w-full py-3 text-lg">🎒 Packing List</Button>
          </Link>
          {/* New Budget Tracking Button */}
          <Link to="/budgetTracking">
            <Button className="w-full py-3 text-lg">💰 Track Your Budget</Button>
          </Link>
        </div>
         {/* Scrapbook Section */}
         <div className="mt-6 p-2">
          <h2 className="text-2xl font-semibold">Your Travel Memories 📖</h2>
          <p className="text-md mt-2">Save your best moments from each trip!</p>
          
          <Link to="/scrapbook">
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition duration-300">
              Open My Scrapbook
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
