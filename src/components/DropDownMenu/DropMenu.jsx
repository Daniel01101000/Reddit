import { useState, useEffect } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/Menu/DropMenu.css";

export default function RedditMenu({ setSubreddit }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 567);

  // Detectar cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 567);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Fondo oscuro solo si el menú está abierto y la pantalla es pequeña */}
      {open && isMobile && <div className="Dark" onClick={() => setOpen(false)}></div>}

      {/* Botón de menú flotante */}
      <button onClick={() => setOpen(!open)} className="menu-button">
        {open ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>

      {/* Menú desplegable */}
      <motion.div
        initial={false}
        animate={{ width: open ? "260px" : "0px" }}
        transition={{ type: "spring", stiffness: 120 }}
        className="menu-dropdown"
      >
        {open && (
          <ul className="menu-list">
            <li className="menu-item" onClick={() => setSubreddit("EarthPorn")}>🏠 Home</li>
            <li className="menu-item" onClick={() => setSubreddit("Popular")}>📈 Popular</li>
            <li className="menu-item" onClick={() => setSubreddit("all")}>📊 All</li>
            <hr className="menu-divider" />
            <li className="menu-item" onClick={() => setSubreddit("Videogames")}>🎮Games</li>
            <li className="menu-item" onClick={() => setSubreddit("Sports")}>⚽Sports</li>
            <li className="menu-item" onClick={() => setSubreddit("Fashion")}>👗Fashion</li>
            <li className="menu-item" onClick={() => setSubreddit("Series")}>📺Shows</li>
            <hr className="menu-divider" />
            <li className="menu-item" onClick={() => setSubreddit("Mexico")}>🌎 r/mexico</li>
            <li className="menu-item" onClick={() => setSubreddit("Reddit")}>🔸 r/reddit.com</li>
            <hr className="menu-divider"/>
            <li className="menu-item" onClick={() => setSubreddit("Reddit")}>ℹ️ About Reddit</li>
          </ul>
        )}
      </motion.div>
    </>
  );
}