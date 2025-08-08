import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import jsPDF from "jspdf";

const categories = {
  Essentials: ["Passport / ID", "Wallet (Cash & Cards)", "Phone & Charger", "Travel Insurance", "Keys", "Boarding Pass", "Emergency Contacts", "Sunglasses"],
  Clothing: ["T-Shirts / Shirts", "Pants / Shorts", "Jacket / Sweater", "Shoes", "Hats / Caps", "Sleepwear", "Socks & Undergarments", "Swimwear"],
  Toiletries: ["Toothbrush & Toothpaste", "Shampoo & Conditioner", "Soap / Body Wash", "Deodorant", "Makeup / Skincare", "Razor & Shaving Cream", "Comb / Hairbrush", "Sunscreen"],
  Tech: ["Laptop & Charger", "Power Bank", "Camera & Memory Cards", "Headphones", "Universal Adapter", "Portable Wi-Fi / SIM Card"],
  Health: ["Prescription Medications", "Pain Relievers", "First Aid Kit", "Hand Sanitizer", "Face Masks", "Vitamins & Supplements", "Eye Drops"],
  Documents: ["Visa (if needed)", "Flight Tickets", "Hotel Reservations", "Travel Itinerary", "Backup Copies of Important Documents"]
};

const destinationCategories = {
  Beach: ["Swimsuit", "Beach Towel", "Sunscreen", "Flip-Flops", "Snorkeling Gear", "Waterproof Bag"],
  Cold: ["Thermal Wear", "Gloves", "Winter Jacket", "Woolen Socks", "Beanie / Ear Muffs", "Lip Balm"],
  Adventure: ["Hiking Boots", "Camping Gear", "Water Bottle", "Insect Repellent", "Flashlight", "Energy Bars"],
  Business: ["Formal Attire", "Work Laptop", "Notebook & Pen", "Business Cards", "Dress Shoes", "PowerPoint Backup"]
};

const PackingList = () => {
  const [customItems, setCustomItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [newItem, setNewItem] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("Essentials");

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const addCustomItem = () => {
    if (newItem.trim() !== "") {
      setCustomItems([...customItems, newItem]);
      setNewItem("");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Packing List", 20, 20);

    let y = 30;
    Object.entries(categories).forEach(([category, items]) => {
      doc.setFont("helvetica", "bold");
      doc.text(category, 20, y);
      doc.setFont("helvetica", "normal");
      items.forEach((item) => {
        y += 10;
        doc.text(`- ${item} ${checkedItems[item] ? "✔" : ""}`, 20, y);
      });
      y += 10;
    });

    if (selectedDestination !== "Essentials") {
      doc.setFont("helvetica", "bold");
      doc.text(selectedDestination + " Trip Essentials", 20, y);
      doc.setFont("helvetica", "normal");
      y += 10;
      destinationCategories[selectedDestination].forEach((item) => {
        doc.text(`- ${item} ${checkedItems[item] ? "✔" : ""}`, 20, y);
        y += 10;
      });
      y += 10;
    }

    customItems.forEach((item) => {
      y += 10;
      doc.text(`- ${item} ${checkedItems[item] ? "✔" : ""}`, 20, y);
    });

    doc.save("PackingList.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">🛄 Packing List Generator</h2>

      {/* Destination Selection */}
      <div className="mb-6 flex flex-col items-center">
        <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">🌍 Select Trip Type:</label>
        <select
          className="border p-2 rounded-md mt-2 w-full md:w-2/3 bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          <option value="Essentials">General Trip</option>
          <option value="Beach">🏖️ Beach Vacation</option>
          <option value="Cold">❄️ Cold Weather</option>
          <option value="Adventure">⛰️ Adventure / Hiking</option>
          <option value="Business">💼 Business Trip</option>
        </select>
      </div>

      {/* Packing List Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{category}</h3>
            <ul>
              {items.map((item) => (
                <li key={item} className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-1 transition">
                  <Switch checked={checkedItems[item] || false} onCheckedChange={() => toggleCheck(item)} className="mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Destination-Specific Packing List */}
      {selectedDestination !== "Essentials" && (
        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedDestination} Trip Essentials</h3>
          <ul>
            {destinationCategories[selectedDestination].map((item) => (
              <li key={item} className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-1 transition">
                <Switch checked={checkedItems[item] || false} onCheckedChange={() => toggleCheck(item)} className="mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Custom Items Section */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">➕ Add Custom Items</h3>
        <div className="flex gap-2 mt-2">
          <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Enter item" className="border p-2 rounded w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200" />
          <Button onClick={addCustomItem} className="bg-green-500 text-white">Add</Button>
        </div>
      </div>

      {/* PDF Download Button */}
      <Button onClick={generatePDF} className="mt-6 bg-blue-500 text-white w-full py-3 text-lg">
        📄 Download Packing List
      </Button>
    </div>
  );
};

export default PackingList;
