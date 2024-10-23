import "./GetPropertyDetails.css";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

function GetPropertyDetails() {
    const [propertyData, setPropertyData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8088/api/properties/getAllProperties`);
                const data = await response.json();

                if (Array.isArray(data.propertyData)) {
                    setPropertyData(data.propertyData);
                } else {
                    console.error('Expected Property Data to be an array:', data.propertyData);
                }

            } catch (error) {
                setError('Error fetching agents:', error);
            }
        };
        fetchPropertyDetails();
    }, []);
    // const filteredProperties = propertyData.filter(property =>
    //     property.city.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const filteredProperties = propertyData.filter(property =>
        (property.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="property-data-main-div">
            <div className="property-data-card1">
                <h1 className="h1-property">Property Details</h1>
                <div className="search-box-get-property-container">
                    <input
                        type="text"
                        className="search-box-get-property-container"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        placeholder="Search by City"
                    />
                </div>

                <div className="property-data-list1">
                    {
                        filteredProperties.map((property, index) => (
                            <div className="property-data-li" key={index}>
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
                                <p className="property-data-p"><strong>Selling Type:</strong> {property.sellingType}</p>
                                <p className="property-data-p"><strong>Property Type:</strong> {property.propertyType}</p>
                                <p className="property-data-p"><strong>Flat Type:</strong> {property.flatType}</p>
                                <p className="property-data-p"><strong>City:</strong> {property.city}</p>
                                <p className="property-data-p"><strong>Locality:</strong> {property.locality}</p>
                                <p className="property-data-p"><strong>Address:</strong> {property.address}</p>
                                <p className="property-data-p"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p className="property-data-p"><strong>Balconies:</strong> {property.balconies}</p>
                                <p className="property-data-p"><strong>Carpet Area:</strong> {property.carpetArea}</p>
                                <p className="property-data-p"><strong>Total Floors:</strong> {property.totalFloors}</p>
                                <p className="property-data-p"><strong>Property Floor:</strong> {property.propertyFloor}</p>
                                <p className="property-data-p"><strong>Possession:</strong> {property.possession}</p>
                                <p className="property-data-p"><strong>Expected Price:</strong> {property.expectedPrice}</p>
                                <p className="property-data-p"><strong>Price Per Sq Ft:</strong> {property.pricePerSqFt}</p>

                            </div>
                        ))}
                 
                </div>
            </div>
        </div>
    );

}

export default GetPropertyDetails;