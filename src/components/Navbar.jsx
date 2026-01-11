import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 transition-colors">
      <h1 className="font-bold text-lg">📚 Book Store</h1>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/add">Add Book</Link>
        <Link to="/dashboard">Dashboard</Link>

        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black"
        >
          Toggle
        </button>
      </div>
    </div>
  );
}
