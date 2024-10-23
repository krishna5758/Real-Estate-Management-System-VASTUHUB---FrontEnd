import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import React from "react";
import "./GetApproveRequestPropertyDetails.css";

function GetApproveRequestPropertyDetails() {
    const [propertyList, setPropertyList] = useState([]);
    const [propertyId, setPropertyId] = useState([]);
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchApproveRequestPropertyDetails = async () => {
            try {
                const response = await fetch('http://localhost:8088/api/properties/getApproveRequestPropertyDetails');
                const data = await response.json();

                if (response.ok) {
                    setPropertyList(data.propertyList || []);
                } else {
                    setError('Failed to fetch property data');
                }
            } catch (err) {
                setError('Error fetching property data');
            } finally {
                setLoading(false);
            }
        };
        fetchApproveRequestPropertyDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const approveProperty = async (id) => {

        try {
            const response = await fetch(`http://localhost:8088/api/properties/sendRequest?propertyId=${id}&status=Approved`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    propertyId,
                    status
                })

            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.status === 409) {
                alert(data.message);
            }
            else if (response.ok) {
                setPropertyList(prevList =>
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
    const filteredProperties = propertyList.filter(property =>
        (property.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="view-all-get-approve-request-property-list">
            <div className="view-all-get-approve-request-property-card-container">
                <h2 className="h2-request-property-list">Property Request List</h2>
                <div className="search-box-approve-request-property-container">
                    <input
                        type="text"
                        className="search-box-approve-request-property-container"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        placeholder="Search by City"
                    />
                </div>
                <div className="get-approve-request-property-data-list">
                    {
                        filteredProperties.map((property, index) => (
                            <div key={index} className="view-all-get-approve-request-property-card">
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
                                <p className="property-list-p"><strong>Selling Type:</strong> {property.sellingType}</p>
                                <p className="property-list-p"><strong>Property Type:</strong> {property.propertyType}</p>
                                <p className="property-list-p"><strong>Flat Type:</strong> {property.flatType}</p>
                                <p className="property-list-p"><strong>City:</strong> {property.city}</p>
                                <p className="property-list-p"><strong>Locality:</strong> {property.locality}</p>
                                <p className="property-list-p"><strong>Address:</strong> {property.address}</p>
                                <p className="property-list-p"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p className="property-list-p"><strong>Balconies:</strong> {property.balconies}</p>
                                <p className="property-list-p"><strong>Carpet Area:</strong> {property.carpetArea}</p>
                                <p className="property-list-p"><strong>Total Floors:</strong> {property.totalFloors}</p>
                                <p className="property-list-p"><strong>Property Floor:</strong> {property.propertyFloor}</p>
                                <p className="property-list-p"><strong>Possession:</strong> {property.possession}</p>
                                <p className="property-list-p"><strong>Expected Price:</strong> {property.expectedPrice}</p>
                                <p className="property-list-p"><strong>Price Per Sq Ft:</strong> {property.pricePerSqFt}</p>
                                <Button className="btn-approve-property"
                                    onClick={() => approveProperty(property.id)}>Approve Property</Button>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default GetApproveRequestPropertyDetails;