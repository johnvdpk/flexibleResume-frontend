import './Input.css'

// eslint-disable-next-line react/prop-types
function Input({ label, name, type, value, placeholder, onChange, inputType = "input" }) {
    return (
        <>
            <label className="global-label">
                <p className='global-label-p'> {label}: </p>
            </label>
            {inputType === "textarea" ? (
                <textarea
                    className="global-input"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    rows="6"
                    cols="50"
                />
            ) : (
                <input
                    className="global-input"
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            )}
        </>
    );
}

export default Input
