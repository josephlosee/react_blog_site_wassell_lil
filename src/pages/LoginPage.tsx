import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { ErrorWithMessage } from "../infrastructure/AuthErrors";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError((e as ErrorWithMessage).message);
        }

    }

    return (
        <>
            <h1>Login</h1>
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
            <button onClick={logIn}>Log In</button>
            <Link to="/create-account">Don't have an account? Create one here!</Link>
            {/* <button onClick={createAccount}>Create</button> */}
        </>
    );
}

export default LoginPage