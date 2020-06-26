import React, { useState } from "react";

const useDropDown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const DropDown = () => (
    <label htmlFor={label}>
      {label}
      <select
        name={label}
        id={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={!options.length}
      >
        <option>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
  return [state, DropDown, setState];
};

export default useDropDown;
