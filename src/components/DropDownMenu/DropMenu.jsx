import { useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/DropMenu.css";

export default function RedditMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-container">
      {/* Línea lateral con botón */}
      <div className="menu-bar">
        <button onClick={() => setOpen(!open)} className="menu-button">
          {open ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú desplegable */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: open ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="menu-dropdown"
      >
        <ul className="menu-list">
          <li className="menu-item">🏠 Home</li>
          <li className="menu-item">📈 Popular</li>
          <li className="menu-item">🧭 Explore</li>
          <li className="menu-item">📊 All</li>
        </ul>
      </motion.div>
    </div>
  );
}
