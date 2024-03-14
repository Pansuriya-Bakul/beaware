import { CgColorPicker } from 'react-icons/cg';
import { useState } from "react";

const ColorPickerInput = ({ input_id, label, type, placeholder, onChange, disabled, required }) => {
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleInputChange = (e) => {
    setSelectedColor(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="input-component my-3 row">
      <div className="col">
        <label htmlFor={input_id} className="form-label color-sec">
          {label}
        </label>
        <input
          className="form-input form-text"
          type={type}
          id={input_id}
          name={input_id}
          placeholder={placeholder ? placeholder : ""}
          onChange={handleInputChange}
          disabled={disabled ? true : false}
          required={required ? true : false}
          value={selectedColor}
        />
      </div>
      <div className="col-lg-auto align-self-center">
        <div className="input-group">
          <label htmlFor="color-picker" className="btn btn-primary bg-transparent border-0">
            <CgColorPicker style={{ fontSize: '30px'}} />
            <input
              type="color"
              id="color-picker"
              className="color-picker-input"
              value={selectedColor}
              onChange={handleColorChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerInput;
