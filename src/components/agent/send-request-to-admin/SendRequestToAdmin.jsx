import Button from 'react-bootstrap/Button';
import "./SendRequestToAdmin.css";
import { useEffect, useState } from 'react';

function SendRequestToAdmin() {

    const [buiedPropertyList, setBuiedPropertyList] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchBuiedPropertyList = async () => {
            try {
                const userId = localStorage.getItem("userId");

                const response = await fetch(`http://localhost:8088/api/properties/getBuiedPropertylist?userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });

                const data = await response.json();
                if (Array.isArray(data.buiedProperties)) {
                    setBuiedPropertyList(data.buiedProperties || []);
                }
                else {
                    console.error('Expected Property Data to be an array:', data.approvedProperties);
                }

            } catch (error) {
                setError('Error fetching agents:', error);
            }
        };
        fetchBuiedPropertyList();
    }, []);

    const sendApprovePropertyRequest = async (id) => {


        try {
            const response = await fetch(`http://localhost:8088/api/properties/sendRequest?propertyId=${id}&status=Request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.status === 409) {
                alert(data.message);
            }
            else if (response.ok) {
                // If the response is successful, you can update the UI
                setBuiedPropertyList(prevList =>
                    prevList.filter(property => property.id !== id)  // Remove the approved property from the list
                );
                alert(data.message);
            } else {
                alert(data.message);
            }
        }
        catch (err) {
            alert('Error approving the property');
        }


    };
    const filteredProperties = buiedPropertyList.filter(property =>
        (property.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="view-all-get-buied-property-list">
            <div className="view-all-get-buied-property-card-container">
                <h2 className="h2-buied-property-list">Buied Property List</h2>
                <div className="search-box-buied-property-container">
                    <input
                        type="text"
                        className="search-box-buied-property-container"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        placeholder="Search by City"
                    />
                </div>
                <div className="get-buied-property-data-list">
                    {
                        filteredProperties.map((property, index) => (
                            <div key={index} className="view-all-get-buied-property-card">
                                <div className="image-container">
                                    {
                                        property.images.map(image => (
                                            <img
                                                key={image.id}
                                                src={`data:image/jpeg;base64,${image.imageBase64}`}
                                                // alt={image.fileName}
                                                className="property-image-home"
                                            />
                                        ))
                                    }
                                </div>
                                <p className="buied-property-list-p"><strong>Selling Type:</strong> {property.sellingType}</p>
                                <p className="buied-property-list-p"><strong>Property Type:</strong> {property.propertyType}</p>
                                <p className="buied-property-list-p"><strong>Flat Type:</strong> {property.flatType}</p>
                                <p className="buied-property-list-p"><strong>City:</strong> {property.city}</p>
                                <p className="buied-property-list-p"><strong>Locality:</strong> {property.locality}</p>
                                <p className="buied-property-list-p"><strong>Address:</strong> {property.address}</p>
                                <p className="buied-property-list-p"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p className="buied-property-list-p"><strong>Balconies:</strong> {property.balconies}</p>
                                <p className="buied-property-list-p"><strong>Carpet Area:</strong> {property.carpetArea}</p>
                                <p className="buied-property-list-p"><strong>Total Floors:</strong> {property.totalFloors}</p>
                                <p className="buied-property-list-p"><strong>Property Floor:</strong> {property.propertyFloor}</p>
                                <p className="buied-property-list-p"><strong>Possession:</strong> {property.possession}</p>
                                <p className="buied-property-list-p"><strong>Expected Price:</strong> {property.expectedPrice}</p>
                                <p className="buied-property-list-p"><strong>Price Per Sq Ft:</strong> {property.pricePerSqFt}</p>
                                <Button onClick={() => sendApprovePropertyRequest(property.id)}
                                    className="btn-get-property-buied">Send Request</Button>
                            </div>

                        ))
                   }
                </div>
            </div>
        </div>
    );
}

export default SendRequestToAdmin;