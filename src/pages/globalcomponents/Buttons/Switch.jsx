import './Switch.css';
// eslint-disable-next-line react/prop-types
function Switch({ option1, option2, onToggle }) {
    return (
        <div className="div-switch">
            <label className="label-switch">
                {option1}
                <input className="input-switch"
                    type="radio"
                    name="switch"
                    value={option1}
                    onChange={() => onToggle(option1)}
                />
            </label>

            <label>
                {option2}
                <input className="input-switch"
                    type="radio"
                    name="switch"
                    value={option2}
                    onChange={() => onToggle(option2)}
                />
            </label>
        </div>
    );
}

export default Switch;