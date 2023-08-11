import React from "react";
import { CheckboxProps } from "./Checkbox.types";

import "./style.css";
/** Component for showing checkbox it could take id, name, value, checked and onChange props */
const Checkbox: React.FC<CheckboxProps> = ({ checkId, checkName, checkValue, onChange, isChecked = false }) => {
  return (
    <label htmlFor={checkId}>
      <input
        type="checkbox"
        id={checkId}
        name={checkName}
        value={checkValue}
        checked={isChecked}
        onChange={() => {
          if (!onChange) return; //Stop execution if method is not provided
          onChange(checkValue ?? '');
        }}
      />
    </label>
  );
};

export default Checkbox;
