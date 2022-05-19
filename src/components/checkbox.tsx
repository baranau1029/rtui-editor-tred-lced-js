import React from 'react';

interface CheckboxProps {
  label: string;
  onClick: () => void;
  id: string;
}

const Checkbox = ({id, label, onClick}: CheckboxProps) => {
  return (
    <div className="form-check form-check-inline" onClick={onClick}>
      <input id={id} type="Checkbox" className="form-check-input" defaultValue={label} />
      <label htmlFor={id} title="Translation" className="form-check-label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
