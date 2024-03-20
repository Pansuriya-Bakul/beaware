
import { Row, Col } from 'react-bootstrap';

export default function InputComponent({ input_id, label, type, placeholder, onChange, required, disabled, value, centered }) {

    return (
        <Row className="my-3" >
            {centered && <Col className='col-2' />}
            <Col className={centered ? 'col-8' : 'col-12'}>
                <Row>
                    <label
                        htmlFor={input_id}
                        className="form-label color-sec"
                    >
                        {label}s
                    </label>
                    <input
                        className="form-input form-text "
                        type={type}
                        id={input_id}
                        name={input_id}
                        placeholder={placeholder ? placeholder : ""}
                        onChange={onChange}
                        defaultValue={value}
                        disabled={disabled ? true : false}
                        required={required ? true : false}
                    />
                </Row>
            </Col>
            {centered && <Col className='col-2' />}

        </Row>
    );
}