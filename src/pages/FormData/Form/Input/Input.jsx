import './Input.css'

// eslint-disable-next-line react/prop-types
function Input({field,label,type, placeholder}) {


    return (
        <label className="global-label" htmlFor={`field${field}`}>
            <p className="global-label-p">{label}</p>
            <input className="global-input"
            type={type}
            name={field}
            placeholder={placeholder}

            />
        </label>

    )


}

export default Input
