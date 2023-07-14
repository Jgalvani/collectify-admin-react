import { React } from "react";
import NotFoundCSS from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  // Render
  return (
    <div className={NotFoundCSS.notFound}>
      <div className={NotFoundCSS.knockoutTitle}>
        <h1 className={NotFoundCSS.title}>Oops!</h1>
      </div>

      <h2 className={NotFoundCSS.secondTitle}>404 - Page introuvable</h2>

      <p className={NotFoundCSS.paragraph}>
        La page que vous cherchez n'existe pas. Si elle n'a pas été supprimé, il
        est possible qu'elle soit temporairement inaccessible ou que son nom ait
        changé.
      </p>
      <Link to="/" className={NotFoundCSS.link}>
        Retour à la page d'accueil
      </Link>
    </div>
  );
}
