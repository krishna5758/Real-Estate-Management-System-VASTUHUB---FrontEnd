import { useEffect, useState } from "react";
import "./GetApprovedPropertyList.css";

function GetApprovedPropertyList() {

    const [approvePropertyList, setApprovePropertyList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchApprovedPropertyList = async () => {
            try {
                const userId = localStorage.getItem("userId");

                const response = await fetch(`http://localhost:8088/api/properties/getApprovedPropertylist?userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });

                const data = await response.json();
                if (Array.isArray(data.approvedProperties)) {
                    setApprovePropertyList(data.approvedProperties || []);
                }
                else {
                    console.error('Expected Property Data to be an array:', data.approvedProperties);
                }

            } catch (error) {
                setError('Error fetching agents:', error);
            }
        };
        fetchApprovedPropertyList();
    }, []);
    const filteredProperties = approvePropertyList.filter(property =>
        (property.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="view-all-get-approved-property-list">
            <div className="view-all-get-approved-property-card-container">
                <h2 className="h2-approved-property-list">Approved Property List</h2>
                <div className="search-box-approved-property-container">
                    <input
                        type="text"
                        className="search-box-approved-property-container"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        placeholder="Search by City"
                    />
                </div>
                <div className="get-approved-property-data-list">
                    {
                        filteredProperties.map((property, index) => (
                            <div key={index} className="view-all-get-approved-property-card">
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
                                <p className="approved-property-list-p"><strong>Selling Type:</strong> {property.sellingType}</p>
                                <p className="approved-property-list-p"><strong>Property Type:</strong> {property.propertyType}</p>
                                <p className="approved-property-list-p"><strong>Flat Type:</strong> {property.flatType}</p>
                                <p className="approved-property-list-p"><strong>City:</strong> {property.city}</p>
                                <p className="approved-property-list-p"><strong>Locality:</strong> {property.locality}</p>
                                <p className="approved-property-list-p"><strong>Address:</strong> {property.address}</p>
                                <p className="approved-property-list-p"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p className="approved-property-list-p"><strong>Balconies:</strong> {property.balconies}</p>
                                <p className="approved-property-list-p"><strong>Carpet Area:</strong> {property.carpetArea}</p>
                                <p className="approved-property-list-p"><strong>Total Floors:</strong> {property.totalFloors}</p>
                                <p className="approved-property-list-p"><strong>Property Floor:</strong> {property.propertyFloor}</p>
                                <p className="approved-property-list-p"><strong>Possession:</strong> {property.possession}</p>
                                <p className="approved-property-list-p"><strong>Expected Price:</strong> {property.expectedPrice}</p>
                                <p className="approved-property-list-p"><strong>Price Per Sq Ft:</strong> {property.pricePerSqFt}</p>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default GetApprovedPropertyList;