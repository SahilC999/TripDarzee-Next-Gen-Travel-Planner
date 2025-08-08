import React, { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "@/context/DarkModeContext.jsx";
import { FaPlus, FaTrash, FaImage } from "react-icons/fa";

const Scrapbook = () => {
  const { darkMode } = useContext(DarkModeContext); // Get Dark Mode state
  const [entries, setEntries] = useState([]);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  // Load scrapbook from localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("scrapbook")) || [];
    setEntries(savedEntries);
  }, []);

  // Save scrapbook to localStorage
  const saveToLocalStorage = (newEntries) => {
    localStorage.setItem("scrapbook", JSON.stringify(newEntries));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Convert image to base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Add New Entry
  const addEntry = () => {
    if (image && caption.trim() !== "") {
      const newEntry = { id: Date.now(), image, caption };
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      saveToLocalStorage(updatedEntries);
      setImage(null);
      setCaption("");
    }
  };

  // Delete Entry
  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    saveToLocalStorage(updatedEntries);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-8`}>
      <h2 className="text-3xl font-bold text-center mb-6">📖 My Travel Scrapbook</h2>

      {/* Upload Section */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} border p-6 rounded-lg shadow-md mb-6 mx-auto max-w-2xl`}>
        <label className="flex items-center justify-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300">
          <FaImage className="mr-2" /> Upload Image
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        {image && (
          <div className="mt-4 flex flex-col items-center">
            <img src={image} alt="Preview" className="w-48 h-48 object-cover rounded-lg shadow-lg" />
          </div>
        )}

        <input
          type="text"
          placeholder="Enter a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-3 mt-4 w-full rounded-lg"
        />

        <button
          onClick={addEntry}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center w-full transition duration-300"
        >
          <FaPlus className="mr-2" /> Add Memory
        </button>
      </div>

      {/* Scrapbook Entries */}
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div key={entry.id} className={`${darkMode ? "bg-gray-800" : "bg-white"} border rounded-lg shadow-lg p-4`}>
              <img src={entry.image} alt="Memory" className="w-full h-48 object-cover rounded-lg" />
              <p className="mt-3 text-center text-lg font-medium">{entry.caption}</p>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center w-full transition duration-300"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-6">No memories added yet. Start by adding one above! 😊</p>
      )}
    </div>
  );
};

export default Scrapbook;
