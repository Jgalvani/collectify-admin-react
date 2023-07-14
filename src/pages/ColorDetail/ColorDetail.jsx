import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";

import ColorDetailCSS from "./ColorDetail.module.css";
import { getColor, createColor, updateColor } from "../../services/ColorSlice";

export default function ColorDetail() {
  // States
  const dispatch = useDispatch();
  const { color, loading, error } = useSelector((state) => state.color);

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
      dispatch(getColor(id));
      setIsEdition(true);
    } else {
      setIsEdition(false);
    }
  }, []);

  const onSubmit = async (data) => {
    if (isEdition) {
      data = { ...color, ...data };
      dispatch(updateColor(data));
    } else {
      dispatch(createColor(data));
    }

    setSubmit(true);
  };

  // Render
  return (
    <div id={ColorDetailCSS.container}>
      {isEdition != null && (
        <span id={ColorDetailCSS.title}>
          {isEdition ? "Edition" : "Ajout"} couleur
        </span>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={ColorDetailCSS.input}>
          <div className={ColorDetailCSS.control}>
            <input
              className={ColorDetailCSS.formInput}
              {...register("name", { required: isEdition })}
              type="text"
              defaultValue={color ? color.name : ""}
            />
          </div>
          {errors.name && (
            <p className={ColorDetailCSS.error}>
              Veuillez choisir une couleur.
            </p>
          )}
        </div>

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

        <div id={ColorDetailCSS.submit}>
          <button type="submit" disabled={!isValid}>
            Valider
          </button>
          {hasSubmit && !error && !loading && (
            <p id={ColorDetailCSS.message}>
              La couleur a été {isEdition ? "modifiée" : "ajoutée"} avec succès
              !
            </p>
          )}
          {hasSubmit && error && !loading && (
            <p id={ColorDetailCSS.message}>Une erreur s'est produite !</p>
          )}
        </div>
      </form>
    </div>
  );
}
