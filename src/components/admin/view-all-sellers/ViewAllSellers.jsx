import { useEffect, useState } from "react";
import "./ViewAllSellers.css";

function ViewAllSellers() {

    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSellers= async () => {
            try {
                const response = await fetch('http://localhost:8088/api/auth/getSellers');
                const data = await response.json();

                if (response.ok) {
                    setSellers(data.sellersList);
                } else {
                    setError('Failed to fetch buyer data');
                }
            } catch (err) {
                setError('Error fetching buyer data');
            } finally {
                setLoading(false);
            }
        };
        fetchSellers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="view-all-seller-list">
            <h2 className="view-all-seller-h2">Seller List</h2>
            <div className="view-all-seller-card-container">
                {sellers.length > 0 ? (
                    sellers.map((seller, index) => (
                        <div key={index} className="view-all-seller-card">
                            <h3>{seller.username}</h3>
                            <p><strong>Gender:</strong> {seller.gender}</p>
                            <p><strong>Email:</strong> {seller.email}</p>
                            <p><strong>Mobile Number:</strong> {seller.mobileNumber}</p>
                        </div>
                    ))
                ) : (
                    <div>No Seller found</div>
                )}
            </div>
        </div>
    );

}

export default ViewAllSellers;