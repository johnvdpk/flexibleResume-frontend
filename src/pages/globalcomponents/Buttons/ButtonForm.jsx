import './ButtonForm.css';

// eslint-disable-next-line react/prop-types
function ButtonForm({text, onClick}) {
    return (

        <button className='button-left-menu' onClick={onClick} type='button'>
            <view className='object'></view>
            {text}
        </button>

    );
}

export default ButtonForm;