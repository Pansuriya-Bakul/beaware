import { Row, Col } from "react-bootstrap";
export default function ColorPickerComponent({ input_id, label, centered, placeholder, onChange, required, disabled, value }) {

    return (
        <Row className="my-3">
            {centered && <Col className='col-2' />}
            <Col className={centered ? 'col-8' : 'col-12'}>
                <label
                    htmlFor={input_id}
                    className="form-label color-sec"
                >
                    {label}
                </label>

                <div className="d-flex flex-row align-items-center flex-nowrap justify-content-between">
                    <input
                        className="form-input form-text"
                        type="text"
                        disabled={true}
                        defaultValue={value}
                        id={input_id + "-text"}
                    />
                    <input
                        type="color"
                        className='form-input form-color'
                        id={input_id + "-box"}
                        name={input_id}
                        placeholder={placeholder ? placeholder : ""}
                        onChange={onChange}
                        value={value}
                        disabled={disabled ? true : false}
                        required={required ? true : false}
                    />
                </div>
            </Col>
            {centered && <Col className='col-2' />}
        </Row>
    );
}