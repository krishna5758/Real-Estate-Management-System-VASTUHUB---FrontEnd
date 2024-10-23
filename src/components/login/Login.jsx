import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        // Email validation
        if (!email)
            newErrors.email = "Email is required";
        else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email))
            newErrors.email = "Email should be valid";

        // Password validation
        if (!password)
            newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/.test(password))
            newErrors.password = "Password must contain at least one number and one special character.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await axios.post('http://localhost:8088/api/auth/login', {
                email,
                password
            });

            console.log(response);
            alert(response.data.message);
            if (response.data.data && response.data.data.userId) {
                setUserId(response.data.data.userId);
                localStorage.setItem("userId", response.data.data.userId);
                console.log(response.data.data.userId);
            }

            if (response.data.data && response.data.data.role) {
                
                if (response.data.data.role === "SELLER") {
                    navigate("/seller-dashboard");

                }
                if (response.data.data.role === "AGENT") {
                    navigate("/agent-dashboard")
                }
                if (response.data.data.role === "ADMIN") {
                    navigate("/admin-dashboard")
                }
                if (response.data.data.role === "BUYER") {
                    navigate("/buyer-dashboard")
                }
            }
        } catch (error) {
            console.error('Error during login: ', error);
            setMessage('Login failed');
        }
    };

    return (
        <div className='loginBoxBack'>
            <div className="loginBox">

                <img className="user"
                    src="https://icons.iconarchive.com/icons/dapino/people/256/brown-man-icon.png"></img>
                <h2>Sign In</h2>
                <form onSubmit={handleLogin}>

                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}

                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}


                    <input type="submit" name="sign-in" value="Sign In" />

                    <div className='register-link1'>
                        <p>Don't have an account?</p>
                        <div className='register-link2'>
                            <Link className='registerlink1' to="/register">Register</Link>
                            <Link className="forgotPassword" to="/forgot-password">Forgot Password</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
