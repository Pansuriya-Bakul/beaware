export default function InputComponent({ input_id, label, type, placeholder, onChange, required, disabled, value }) {

    return (
        <div className="input-component my-3 row" >
            <label
                htmlFor={input_id}
                className="form-label color-sec"
            >
                {label}
            </label>
            <div>
                <input
                    className="form-input form-text"
                    type={type}
                    id={input_id}
                    name={input_id}
                    placeholder={placeholder ? placeholder : ""}
                    onChange={onChange}
                    defaultValue={value}
                    disabled={disabled ? true : false}
                    required={required ? true : false}
                />
            </div>
        </div>
    );
}