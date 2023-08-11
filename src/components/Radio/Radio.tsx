import React from "react";
import { RadioProps } from "./Radio.types";

import "./style.css";
/** Component for showing radio it could take id, name, value, checked and onChange props */
const Radio: React.FC<RadioProps> = ({ checkId, checkName, checkValue, isChecked = false, onChange }) => {
  return (
    <label htmlFor={checkId}>
      <input
        type="radio"
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

export default Radio;
