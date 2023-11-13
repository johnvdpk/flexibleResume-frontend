import './Switch.css';
// eslint-disable-next-line react/prop-types
function Switch({ option1, option2, onToggle }) {
    return (
        <div className="div-switch">
            <label className="label-switch">
                <input className="input-switch"
                    type="radio"
                    name="role"
                    value="USER"
                    onChange={() => onToggle("USER")}
                />
                {option1}
            </label>
            <label className="label-switch">
                <input className="input-switch"
                    type="radio"
                    name="role"
                    value="COMPANY"
                    onChange={() => onToggle("COMPANY")}
                />
                {option2}
            </label>
        </div>
    );
}

export default Switch;