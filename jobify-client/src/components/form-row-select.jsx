import React from "react";

const FormRowSelect = ({ name, value, options, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name || "Label"}
      </label>
      <select
        name={name || "name"}
        id={name || "id"}
        className="form-select"
        onChange={handleChange}
        value={value}
      >
        {options.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
