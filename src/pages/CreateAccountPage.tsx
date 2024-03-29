import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { ErrorWithMessage } from "../infrastructure/AuthErrors";

// interface CreateAccountPageProps {

// }

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password != confirmPassword) {
                setError('Password and confirm password do not match!');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError((e as ErrorWithMessage).message);
        }

    }

    return (
        <>
            <h1>Create Account</h1>
            {error && <p className="error">{error}</p>}
            <label>
                Email
                <input 
                    type="text" 
                    value={email}
                    onChange={e => setEmail((e!.target as HTMLInputElement).value)}></input>
            </label>
            <br/>
            <label>
                Password
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword((e!.target as HTMLInputElement).value)}>
                </input>
            </label>
            <br/>
            <label>
                Confirm Password
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword((e!.target as HTMLInputElement).value)}>
                </input>
            </label>
            <br/>
            <button onClick={createAccount}>Create Account</button>
            <Link to="/login">Already have an account? Log in here!</Link>
        </>
    );
}

export default CreateAccountPage