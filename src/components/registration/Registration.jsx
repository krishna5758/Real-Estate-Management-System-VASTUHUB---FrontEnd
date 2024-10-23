import React from "react";
import { useState } from "react";
import './Registration.css';

const Registration = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!username)
            newErrors.username = "Username is required";
        else if (!/^[a-zA-Z ]+$/.test(username))
            newErrors.username = "Username must contain only letters.";

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

        // Confirm password validation
        if (!confirmpassword)
            newErrors.confirmpassword = "Confirm Password is required";
        else if (password !== confirmpassword)
            newErrors.confirmpassword = "Passwords do not match";

        // Gender validation
        if (!gender)
            newErrors.gender = "Gender is required";

        // Mobile Number validation
        if (!mobileNumber)
            newErrors.mobileNumber = "Mobile Number is required";
        else if (!/^[0-9]{10}$/.test(mobileNumber))
            newErrors.mobileNumber = "Mobile Number must be between 10 digits and contain only numbers.";

        // Role validation
        if (!role)
            newErrors.role = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) return;
        try {
            const response = await fetch('http://localhost:8088/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, confirmpassword, gender, mobileNumber, role }),
            });

            const data = await response.json();

            if (response.status === 409) {
                alert(data.message);
            }
            else if (response.ok) {
                alert(data.message);
                // Clear form fields
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setGender('');
                setMobileNumber('');
                setRole('');
                setErrors({});
            }
            else {
                alert('Registration Failed');
            }

        } catch (error) {
            alert('An error occurred');
        }

    };

    return (
        <div className="register-box-div">
            <div className="registerBox">
                <img className="user1"
                    src="https://icons.iconarchive.com/icons/dapino/people/256/brown-man-icon.png"></img>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    {/* <div className="input-box1"> */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    {/* <FaUser className="icon1" /> */}

                    {errors.username && <div className="error">{errors.username}</div>}
                    {/* </div>
                <div className="input-box1"> */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ID"
                        required
                    />
                    {/* <FaEnvelope className="icon1" /> */}
                    {errors.email && <div className="error">{errors.email}</div>}
                    {/* </div>
                <div className="input-box1"> */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    {/* <FaLock className="icon1" /> */}
                    {errors.password && <div className="error">{errors.password}</div>}
                    {/* </div>
                <div className="input-box1"> */}
                    <input
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                    {/* <FaLock className="icon1" /> */}
                    {errors.confirmpassword && <div className="error">{errors.confirmpassword}</div>}
                    {/* </div>
                <div className="input-box1"> */}
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {/* <FaMars className="icon"/> */}
                    {errors.gender && <div className="error">{errors.gender}</div>}
                    {/* </div>

                <div className="input-box1"> */}
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Mobile Number"
                        required
                    />
                    {/* <FaMobileAlt className="icon1" /> */}
                    {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
                    {/* </div>
                <div className="input-box1"> */}
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="AGENT">Agent</option>
                        <option value="BUYER">Buyer</option>
                        <option value="SELLER">Seller</option>
                    </select>
                    {/* <FaUserTie className="icon"/> */}
                    {errors.role && <div className="error1">{errors.role}</div>}
                    {/* </div> */}
                    <button className="btn-register" type="submit">Register</button>
                    {message && <div>{message}</div>}
                </form>
            </div>
        </div>
    )
};
export default Registration;
