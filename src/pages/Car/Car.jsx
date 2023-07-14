import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CarCSS from "./Car.module.css";
import { getCars, deleteCar } from "../../services/CarSlice";
import DeleteModal from "../../components/DeleteModal";

export default function Car() {
  // States
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.car);

  // Behaviour
  useEffect(() => {
    dispatch(getCars());
  }, []);

  const handleDeleteCar = async (id) => {
    dispatch(deleteCar(id));
  };

  // Render
  return (
    <div id={CarCSS.container}>
      <span id={CarCSS.title}>Listing voiture</span>

      <div className={CarCSS.inline}>
        <Link to="detail">
          <button>Ajouter</button>
        </Link>
      </div>

      <table>
        <thead>
          <tr id="CarCSS.headers">
            <th className={CarCSS.header}>Voiture</th>
            <th className={CarCSS.header}>Couleurs</th>
            <th className={CarCSS.header}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cars != undefined &&
            cars.map((car, i) => {
              return (
                <tr
                  className={CarCSS.row + (i % 2 ? " " + CarCSS.grey : "")}
                  key={car.car_id}
                >
                  <td className={CarCSS.cell}>{car.name}</td>
                  <td className={CarCSS.cell}>
                    {JSON.stringify(car.colors.map((c) => c.name))}
                  </td>
                  <td className={CarCSS.cell}>
                    <span>
                      {!loading && (
                        <Link to={"detail/" + car.car_id}>Editer</Link>
                      )}
                      {loading && "Editer"}
                    </span>
                    {" - "}
                    <DeleteModal
                      type="voiture"
                      name={car.name}
                      id={car.car_id}
                      handleDelete={handleDeleteCar}
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
