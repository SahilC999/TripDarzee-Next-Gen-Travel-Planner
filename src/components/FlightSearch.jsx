import { useState, useContext } from "react";
import { fetchFlights } from "../api/FlightApi";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext"; // Import Dark Mode Context

const FlightSearch = () => {
  const { darkMode } = useContext(DarkModeContext); // Get Dark Mode state
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!origin || !destination || !date) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    const results = await fetchFlights(origin, destination, date);
    setLoading(false);
    if (results) {
      setFlights(results);
    } else {
      setError("No flights found. Please try again.");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex items-center justify-center p-6`}>
      <div className={`${darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-lg"} rounded-lg p-6 max-w-3xl w-full`}>
        <h2 className="text-2xl font-bold text-center mb-6">✈️ Search Flights</h2>
        
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaPlaneDeparture className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Origin (JFK)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className={`${darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"} border p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="relative">
            <FaPlaneArrival className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Destination (LAX)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={`${darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"} border p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"} border p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center w-full md:w-auto mx-auto transition duration-300"
          >
            <FaSearch className="mr-2" /> Search Flights
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Loading Indicator */}
        {loading && <p className="text-center mt-4 text-gray-500">Searching for flights...</p>}

        {/* Flight Results */}
        {flights.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold border-b pb-2">Available Flights</h3>
            <div className="mt-4 space-y-4">
              {flights.map((flight, index) => (
                <div key={index} className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"} border p-4 rounded-lg shadow-sm`}>
                  <p className="font-medium">
                    🛫 {flight.itineraries[0].segments[0].departure.iataCode} → 🛬 {flight.itineraries[0].segments[0].arrival.iataCode}
                  </p>
                  <p className="text-gray-600">📅 Date: {flight.itineraries[0].segments[0].departure.at.split("T")[0]}</p>
                  <p className="text-green-500 font-bold text-lg">💰 ${flight.price.total}</p>
                  <button
                    onClick={() => window.open(flight.bookingUrl, "_blank")}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
