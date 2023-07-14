import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";

import CarDetailCSS from "./CarDetail.module.css";
import {
  getCar,
  createCar,
  updateCar,
  setColorIds,
} from "../../services/CarSlice";
import { getColors } from "../../services/ColorSlice";

export default function CarDetail() {
  // States
  const dispatch = useDispatch();
  const { car, selectedColorIds, loading, error } = useSelector(
    (state) => state.car
  );
  const { colors } = useSelector((state) => state.color);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const [isEdition, setIsEdition] = useState(null);
  const [hasSubmit, setSubmit] = useState(false);
  const { id } = useParams();

  // Behaviour
  useEffect(() => {
    if (id) {
      dispatch(getCar(id));
      setIsEdition(true);
    } else {
      setIsEdition(false);
    }

    dispatch(getColors());
  }, []);

  const handleColorChange = (event) => {
    console.log(selectedColorIds);
    let colorIds = [...selectedColorIds];

    if (event.target.checked) {
      colorIds = [...colorIds, event.target.value];
    } else {
      colorIds.splice(colorIds.indexOf(event.target.value), 1);
    }
    dispatch(setColorIds(colorIds));
  };

  const onSubmit = async (data) => {
    if (isEdition) {
      data = { ...car, ...data, colorIds: selectedColorIds };
      dispatch(updateCar(data));
    } else {
      data = { ...data, colorIds: selectedColorIds };
      dispatch(createCar(data));
    }

    setSubmit(true);
  };

  // Render
  return (
    <div id={CarDetailCSS.container}>
      {isEdition != null && (
        <span id={CarDetailCSS.title}>
          {isEdition ? "Edition" : "Ajout"} voiture
        </span>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={CarDetailCSS.input}>
          <div className={CarDetailCSS.control}>
            <input
              className={CarDetailCSS.formInput}
              {...register("name", { required: !isEdition })}
              type="text"
              defaultValue={car ? car.name : ""}
            />
          </div>
          {errors.name && (
            <p className={CarDetailCSS.error}>Veuillez choisir une voiture.</p>
          )}
        </div>

        {((isEdition && !!car) || !isEdition) && (
          <div className={CarDetailCSS.input}>
            <div>
              {colors.map((color) => (
                <div key={color.color_id}>
                  <input
                    className={CarDetailCSS.formCheckbox}
                    type="checkbox"
                    onChange={handleColorChange}
                    value={color.color_id}
                    defaultChecked={selectedColorIds.includes(color.color_id)}
                  />
                  <label className={CarDetailCSS.formQuestion}>
                    {color.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "end", width: "87%" }}>
            <InfinitySpin
              height="80"
              width="80"
              radius="9"
              color="darkcyan"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}

        <div id={CarDetailCSS.submit}>
          <button type="submit" disabled={!isValid}>
            Valider
          </button>
          {hasSubmit && !error && !loading && (
            <p id={CarDetailCSS.message}>
              La voiture a été {isEdition ? "modifiée" : "ajoutée"} avec succès
              !
            </p>
          )}
          {hasSubmit && error && !loading && (
            <p id={CarDetailCSS.message}>Une erreur s'est produite !</p>
          )}
        </div>
      </form>
    </div>
  );
}
