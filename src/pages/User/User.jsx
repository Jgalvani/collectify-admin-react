import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserCSS from "./User.module.css";
import { getUsers, deleteUser } from "../../services/UserSlice";
import DeleteModal from "../../components/DeleteModal";

export default function User() {
  // States
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  // Behaviour
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDeleteUser = async (id) => {
    dispatch(deleteUser(id));
  };

  // Render
  return (
    <div id={UserCSS.container}>
      <span id={UserCSS.title}>Listing prospect</span>

      <div className={UserCSS.inline}>
        <Link to="/user/detail">
          <button>Ajouter</button>
        </Link>
      </div>

      <table>
        <thead>
          <tr id={UserCSS.headers}>
            <th className={UserCSS.header}>Nom</th>
            <th className={UserCSS.header}>Prénom</th>
            <th className={UserCSS.header}>Date de naissance</th>
            <th className={UserCSS.header}>Permis ?</th>
            <th className={UserCSS.header}>Voiture</th>
            <th className={UserCSS.header}>Couleur</th>
            <th className={UserCSS.header}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {!!users.length &&
            users.map((user, i) => {
              return (
                <tr
                  className={UserCSS.row + (i % 2 ? " " + UserCSS.grey : "")}
                  key={user.user_id}
                >
                  <td className={UserCSS.cell}>{user.firstname}</td>
                  <td className={UserCSS.cell}>{user.lastname}</td>
                  <td className={UserCSS.cell}>
                    {user.birthdate.split("T")[0]}
                  </td>
                  <td className={UserCSS.cell}>
                    {user.has_driver_licence ? "oui" : "non"}
                  </td>
                  <td className={UserCSS.cell}>
                    {user.car ? user.car.name : ""}
                  </td>
                  <td className={UserCSS.cell}>
                    {user.color ? user.color.name : ""}
                  </td>
                  <td className={UserCSS.cell}>
                    <span>
                      {!loading && (
                        <Link to={"/user/detail/" + user.user_id}>Editer</Link>
                      )}
                      {loading && "Editer"}
                    </span>
                    {" - "}
                    <DeleteModal
                      type="utilisateur"
                      name={user.name}
                      id={user.user_id}
                      handleDelete={handleDeleteUser}
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
