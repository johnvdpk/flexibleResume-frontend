import './LoginForm.css'
import { useForm } from 'react-hook-form';

function LoginForm() {

    // const {register} = useForm();

    return (

        <form className="inlog-form">
            <input
                type="text"
                placeholder="email@mail.com"
                className="input-email-icon"
            />

            <input

                type="text"
                placeholder="********"
                className="input-password-icon"
            />
        </form>
    )


}

export default LoginForm