import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg text-white font-semibold">Dashboard</h1>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 
             hover:opacity-90 text-white px-4 py-2 rounded-xl 
             shadow-md hover:shadow-lg transition-all duration-200"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}
