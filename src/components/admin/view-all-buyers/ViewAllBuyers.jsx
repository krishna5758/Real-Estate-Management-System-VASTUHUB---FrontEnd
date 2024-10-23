import { useEffect, useState } from "react";
import "./ViewAllBuyers.css";

function ViewAllBuyers() {

    const [buyers, setBuyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const response = await fetch('http://localhost:8088/api/auth/getBuyers');
                const data = await response.json();

                if (response.ok) {
                    setBuyers(data.buyersList);
                } else {
                    setError('Failed to fetch buyer data');
                }
            } catch (err) {
                setError('Error fetching buyer data');
            } finally {
                setLoading(false);
            }
        };
        fetchBuyers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="view-all-buyer-list">
            <h2>Buyer List</h2>
            <div className="view-all-buyer-card-container">
                {buyers.length > 0 ? (
                    buyers.map((buyer, index) => (
                        <div key={index} className="view-all-buyer-card">
                            <h3>{buyer.username}</h3>
                            <p><strong>Gender:</strong> {buyer.gender}</p>
                            <p><strong>Email:</strong> {buyer.email}</p>
                            <p><strong>Mobile Number:</strong> {buyer.mobileNumber}</p>
                        </div>
                    ))
                ) : (
                    <div>No buyer found</div>
                )}
            </div>
        </div>
    );

}

export default ViewAllBuyers;