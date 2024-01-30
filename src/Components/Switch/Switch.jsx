import './Switch.css';
// eslint-disable-next-line react/prop-types
function Switch({ option1, option2, option1Name, option2Name, onToggle }) {
    return (
        <div className="div-switch">
            <label className="label-switch">

                <input className="input-switch"
                    type="radio"
                    name="switch"
                    value={option1}
                    onChange={() => onToggle(option1)}
                />
                {option1Name}
            </label>

            <label className="label-switch">

                <input className="input-switch"
                    type="radio"
                    name="switch"
                    value={option2}
                    onChange={() => onToggle(option2)}
                />
                {option2Name}
            </label>
        </div>
    );
}

export default Switch;