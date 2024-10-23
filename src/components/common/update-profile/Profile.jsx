import { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState([]);
    const [updatedUser, setUpdatedUser] = useState({
        username: '',
        mobileNumber: '',
        gender: '',
      });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const userId = localStorage.getItem("userId");
                console.log(userId);
                const response = await fetch(`http://localhost:8088/api/auth/getUserProfile?userId=${userId}`);
                const data = await response.json();

                if (Array.isArray(data.userDetails)) {
                    setUserData(data.userDetails);
                } else {
                    console.error('Expected Profile Data to be an array:', data.userDetails);
                }

            } catch (error) {
                setError('Error fetching agents:', error);
            }
        };
        fetchProfileDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
 
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:8088/api/auth/updateUserProfile?userId=${userId}&username=${updatedUser.username}&gender=${updatedUser.gender}&mobileNumber=${updatedUser.mobileNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            const data = await response.json();

            if (response.status === 409) {
                alert(data.message);
            }
            else if (response.ok) {
                alert(data.message);
                // setUserData({
                //     ...userData,
                //     username: updatedUser.username,
                //     mobileNumber: updatedUser.mobileNumber,
                //     gender: updatedUser.gender,
                //   });
                setUserData((prevData) => 
                    prevData.map((user) => 
                        user.id === userId 
                        ? { ...user, username: updatedUser.username, mobileNumber: updatedUser.mobileNumber, gender: updatedUser.gender }
                        : user
                    )
                );
                setUpdatedUser({
                    username:data.updatedUser.username,
                    mobileNumber:data.updatedUser.mobileNumber,
                    gender:data.updatedUser.gender
                });
                
            }
            else {
                alert('Registration Failed');
            }

        } catch (error) {
            alert('An error occurred');
        }

    };
    
    // if (loading) return <p>Loading user data...</p>;
    // if (error) return <p>{error}</p>;
    // if (!userData) return <p>No user data available</p>;
    return (
        <div className="user-details-div">
            <h2 className="user-details-h2">Update User Information</h2>
            <div className="profile-data-list-div">
                {userData.map((user, index) => (
                    <form onSubmit={handleUpdateProfile} key={index}>
                        <div className="user-details-form-div">
                            <label>Role:</label>
                            <input
                                type="text"
                                name="role"
                                value={user.role}
                                disabled
                                readOnly
                            />
                        </div>
                        <div className="user-details-form-div">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={updatedUser.username || user.username}
                                onChange={handleChange}
                                required
                            />
                        </div >
                        <div className="user-details-form-div">
                            <label>Mobile Number:</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={updatedUser.mobileNumber || user.mobileNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="user-details-form-div">
                            <label>Gender:</label>
                            <select
                                name="gender"
                                value={updatedUser.gender || user.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="user-details-form-div">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                disabled
                                readOnly
                            />
                        </div>
                        <div className="user-details-form-btn-update">
                            <button type="submit">Update</button>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    );
};

export default Profile;
