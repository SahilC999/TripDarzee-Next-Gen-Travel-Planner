import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="m-3 items-end p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md"
    >
      {darkMode ? "🌞" : "🌙 "}
    </button>
  );
}
