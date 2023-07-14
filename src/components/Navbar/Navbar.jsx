import { React } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css";

export default function Navbar() {
  // States
  const location = useLocation();

  // Render
  return (
    <div id={NavbarCSS.container}>
      <Link to="/user/" className={NavbarCSS.noTextDecoration}>
        <div
          className={`${NavbarCSS.page} ${
            !location.pathname.includes("car") &&
            !location.pathname.includes("color")
              ? NavbarCSS.blue
              : ""
          }`}
        >
          Prospect
        </div>
      </Link>
      <Link to="/car/" className={NavbarCSS.noTextDecoration}>
        <div
          className={`${NavbarCSS.page} ${
            location.pathname.includes("car") ? NavbarCSS.blue : ""
          }`}
        >
          Voiture
        </div>
      </Link>
      <Link to="/color/" className={NavbarCSS.noTextDecoration}>
        <div
          className={`${NavbarCSS.page} ${
            location.pathname.includes("color") ? NavbarCSS.blue : ""
          }`}
        >
          Couleur
        </div>
      </Link>
    </div>
  );
}
