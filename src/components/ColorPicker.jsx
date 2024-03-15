export default function ColorPickerComponent({ input_id, label, placeholder, onChange, required, disabled, value }) {

    return (
        <div className="input-component my-3 row" >
            <label
                htmlFor={input_id}
                className="form-label color-sec"
            >
                {label}
            </label>

            <div className="form-input">
                <input
                    className="form-text"
                    type="text"
                    disabled={true}
                    id={input_id + "-text"}
                />
                <input
                    type="color"
                    id={input_id + "-color"}
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