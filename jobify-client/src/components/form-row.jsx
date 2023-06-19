import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name || "Label"}
      </label>
      <input
        type={type || "text"}
        className="form-input"
        id={name || "id"}
        name={name || "name"}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
