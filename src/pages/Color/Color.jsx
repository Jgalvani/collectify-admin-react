import { React, useEffect } from "react";
import { Link } from "react-router-dom";

import ColorCSS from "./Color.module.css";
import { getColors, deleteColor } from "../../services/ColorSlice";
import DeleteModal from "../../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";

export default function Color() {
  // States
  const dispatch = useDispatch();
  const { colors, loading } = useSelector((state) => state.color);

  // Behaviour
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const handleDeleteColor = async (id) => {
    dispatch(deleteColor(id));
  };

  // Render
  return (
    <div id={ColorCSS.container}>
      <span id={ColorCSS.title}>Listing couleur</span>

      <div className={ColorCSS.inline}>
        <Link to="detail">
          <button>Ajouter</button>
        </Link>
      </div>

      <table>
        <thead>
          <tr id={ColorCSS.headers}>
            <th className={ColorCSS.header}>Couleur</th>
            <th className={ColorCSS.header}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {colors.map((color, i) => {
            return (
              <tr
                className={ColorCSS.row + (i % 2 ? " " + ColorCSS.grey : "")}
                key={color.color_id}
              >
                <td className={ColorCSS.cell}>{color.name}</td>
                <td className={ColorCSS.cell}>
                  <span>
                    {!loading && (
                      <Link to={"detail/" + color.color_id}>Editer</Link>
                    )}
                    {loading && "Editer"}
                  </span>
                  {" - "}
                  <DeleteModal
                    type="couleur"
                    name={color.name}
                    id={color.color_id}
                    handleDelete={handleDeleteColor}
                    disabled={loading}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
