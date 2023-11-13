import React, {useState} from 'react';

function ToggleVisibilityButton({targetId}) {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // Toggel de zichtbaarheid van de target div
    const targetDiv = document.getElementById(targetId);
    if (targetDiv) {
        targetDiv.style.display = isVisible ? 'none' : 'block';
    }


return (
    <button onClick={toggleVisibility}>
        {isVisible ? 'Verberg' : 'Toon'}
    </button>
    );

}
export default ToggleVisibilityButton;