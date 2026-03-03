import { NavLink } from "react-router-dom";
import { Package, PlusCircle } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl hidden md:flex flex-col">
      <div className="px-6 py-[22px] border-b border-white/20">
        <h2 className="text-xl font-bold tracking-wide">Catalog Manager</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
              isActive
                ? "bg-white/20 backdrop-blur-md font-medium"
                : "hover:bg-white/10"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-lg"></span>
              )}

              <Package
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Products</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/add-product"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
              isActive
                ? "bg-white/20 backdrop-blur-md font-medium"
                : "hover:bg-white/10"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-lg"></span>
              )}

              <PlusCircle
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Add Product</span>
            </>
          )}
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/20">
        <p className="text-center text-white/70 text-xs leading-relaxed">
          © {new Date().getFullYear()} Catalog Manager <br />
          Built by{" "}
          <a
            href="https://github.com/Firmansyah-F"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:text-blue-200 transition"
          >
            Fikri Firmansyah
          </a>
        </p>
      </div>
    </aside>
  );
}
