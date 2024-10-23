import axios from "axios";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const validateForm = () => {
        const newErrors = {};
        if (!email)
            newErrors.email = "Email is required";
        else if (!/^[a-zA-Z0-9]+@gmail\.com$/.test(email))
            newErrors.email = "Email should be valid";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // const handleResetPasswordClick = () => {
    //     if (!validateForm()) return;
    //     navigate('/reset-password');  // Navigate to the reset password page
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await fetch(`http://localhost:8088/api/auth/forgot-password?email=${(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(response);
            // setMessage(response.data);
            if (response.status === 409) {
                alert(data.message);
                console.log(data.message);
            }
            else if (response.ok) {
                // toast.success(data.message, {
                //     position: toast.POSITION.TOP_CENTER,
                //     autoClose: 3000,  // Close after 3 seconds
                //     hideProgressBar: true
                // });
                alert(data.message);
                // Clear form fields
                setEmail('');

                if (data.message === "Reset password email sent!") {
                    navigate('/reset-password');
                }

            }

        }
        catch (error) {
            alert('Something went wrong, please try again later.');

        }
    };

    return (

        // <div className="container1">
            <div className="forgotBoxMain">
        <div className="forgotBox">
              <img className="user-forgot"
                src="https://icons.iconarchive.com/icons/dapino/people/256/brown-man-icon.png"></img>
           
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    {/* <div className="input-box-forgot"> */}
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        {/* <FaEnvelope className="icon" /> */}
                    {/* </div> */}
                    <button className="reset-token"
                    type="submit">Send Reset Token</button>
                </form>
                {/* <ToastContainer /> */}
                {/* {message && <p>Message : {message}</p>} */}
            </div>
        </div>
    );
}

export default ForgotPassword;