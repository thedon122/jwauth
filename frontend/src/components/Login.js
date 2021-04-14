import React, { useState, useContext, useEffect } from 'react';
import { navigate } from '@reach/router';
import { UserContext } from '../App';

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {

    }

    const handleChange = e => {

    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                value={email}
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Email"
                autoComplete="email"
                />
                <input
                value={password}
                onChange={handleChange}
                type="text"
                name="password"
                placeholder="Password"
                autoComplete="password"
                />
            </form>
        </div>
    )
}

export default Login;