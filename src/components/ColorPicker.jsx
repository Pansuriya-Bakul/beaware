export default function ColorPickerComponent({ input_id, label, placeholder, onChange, required, disabled, value }) {

    return (
        <div className="input-component my-3 row" >
            <label
                htmlFor={input_id}
                className="form-label color-sec"
            >
                {label}
            </label>

            <div className="color-picker">
                <input
                    className="form-input form-text"
                    type="text"
                    disabled={true}
                    value={value}
                    id={input_id + "-text"}
                />
                <input
                    type="color"
                    className="form-input form-color"
                    id={input_id + "-box"}
                    name={input_id}
                    placeholder={placeholder ? placeholder : ""}
                    onChange={onChange}
                    value={value}
                    disabled={disabled ? true : false}
                    required={required ? true : false}
                />
            </div>

        </div>
    );
}