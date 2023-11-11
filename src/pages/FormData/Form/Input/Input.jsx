import './Input.css'

// eslint-disable-next-line react/prop-types
function Input({ label, name, type, value, placeholder, onChange }) {
    return (
        <>
        <label className="global-label">
            <p className='global-label-p'> {label}: </p>
        </label>
            <input
                className="global-input"
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    );
}

export default Input
