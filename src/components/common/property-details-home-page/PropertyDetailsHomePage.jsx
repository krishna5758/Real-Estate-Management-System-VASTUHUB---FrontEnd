import "./PropertyDetailsHomePage.css";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

function PropertyDetailsHomePage() {
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

    const filteredProperties = propertyData.filter(property =>
        (property.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="property-data-home-main-div">
            <div className="property-data-home-card1">
                <div className="search-box-home-container">
                    <input
                        type="text"
                        className="search-box-home"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        placeholder="Search by City"
                    />

                </div>
                <div className="property-data-home-list1">
                    {filteredProperties.map((propertyData, index) => (

                        < div className="property-data-home-li" key={index} >
                            <div className="image-container">
                                {
                                    propertyData.images.map(image => (
                                        <img
                                            key={image.id}
                                            src={`data:image/jpeg;base64,${image.imageBase64}`}
                                            // alt={image.fileName}
                                            className="property-image-home"
                                        />
                                    ))
                                }
                            </div>
                            {/* <p className="property-data-home-p"><strong>Selling Type:</strong> {propertyData.sellingType}</p>
                            <p className="property-data-home-p"><strong>Property Type:</strong> {propertyData.propertyType}</p> */}
                            <p className="property-data-home-p"><strong>Flat Type:</strong> {propertyData.flatType}</p>
                            <p className="property-data-home-p"><strong>City:</strong> {propertyData.city}</p>
                            <p className="property-data-home-p"><strong>Locality:</strong> {propertyData.locality}</p>
                            <p className="property-data-home-p"><strong>Address:</strong> {propertyData.address}</p>
                            <p className="property-data-home-p"><strong>Bedrooms:</strong> {propertyData.bedrooms}</p>
                            <p className="property-data-home-p"><strong>Balconies:</strong> {propertyData.balconies}</p>
                            <p className="property-data-home-p"><strong>Carpet Area:</strong> {propertyData.carpetArea}</p>
                            {/* <p className="property-data-home-p"><strong>Total Floors:</strong> {propertyData.totalFloors}</p>
                            <p className="property-data-home-p"><strong>Property Floor:</strong> {propertyData.propertyFloor}</p> */}
                            <p className="property-data-home-p"><strong>Possession:</strong> {propertyData.possession}</p>
                            <p className="property-data-home-p"><strong>Expected Price:</strong> {propertyData.expectedPrice}</p>
                            {/* <p className="property-data-home-p"><strong>Price Per Sq Ft:</strong> {propertyData.pricePerSqFt}</p> */}

                            {/* <Button className="btn-get-property-send-request">Send Request</Button> */}
                        </div>

                    ))}

                </div>

                {/* <div className="property-data-list1">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property, index) => (
                            <li className="property-data-li" key={index}>
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
                                {property.images.map(image => (
                                    <img
                                        key={image.id}
                                        src={image.imageBase64}
                                        alt={image.fileName}
                                        className="property-image"
                                    />
                                ))}
                            </li>
                        ))
                    ) : (
                        <p>No properties found for the selected city.</p>
                    )}
                </div> */}
            </div>
        </div >


    );
}

export default PropertyDetailsHomePage;