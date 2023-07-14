import { React, useEffect } from "react";
import Select from "react-select";
import DefaultSelectCSS from "./DefaultSelect.module.css";

export default function DefaultSelect({
  options,
  defaultOption,
  handleChange,
}) {
  // States
  useEffect(() => {
    if (defaultOption) {
      handleChange(defaultOption);
    }
  }, []);

  // Render
  return (
    <div className={DefaultSelectCSS.input}>
      <div className={DefaultSelectCSS.control}>
        <Select
          className={DefaultSelectCSS.formSelect}
          label="Modèle"
          options={options}
          onChange={handleChange}
          defaultValue={defaultOption}
        />
      </div>
    </div>
  );
}
