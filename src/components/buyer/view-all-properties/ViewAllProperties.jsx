import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import "./ViewAllProperties.css";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ViewAllProperties() {
    const [propertyData, setPropertyData] = useState([]);
     const [searchQuery, setSearchQuery] = useState("");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkedProperties, setBookmarkedProperties] = useState({});
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

    const buiedProperty = async (id) => {

        try {
            const response = await fetch(`http://localhost:8088/api/properties/sendRequest?propertyId=${id}&status=Buy`, {
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
                // setPropertyData(prevList =>
                //     prevList.filter(property => property.id !== id)  // Remove the approved property from the list
                // );
                alert(data.message);
            } else {
                alert(data.message);
            }
        }
        catch (err) {
            alert('Error approving the property');
        }


    };

      const handleBookmarkClick = async (propertyId) => {
        const newBookmarkedProperties = { ...bookmarkedProperties };
        const isCurrentlyBookmarked = newBookmarkedProperties[propertyId] || false;

        // Temporarily update UI before server response (optimistic update)
        newBookmarkedProperties[propertyId] = !isCurrentlyBookmarked;
        setBookmarkedProperties(newBookmarkedProperties);

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:8088/api/properties/bookmarked?userId=${userId}&propertyId=${propertyId}&status=Bookmarked`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                // Revert bookmark UI on failure
                newBookmarkedProperties[propertyId] = isCurrentlyBookmarked;
                setBookmarkedProperties(newBookmarkedProperties);
                alert(data.message || "Error bookmarking the property");
            }
        } catch (error) {
            // Revert bookmark UI on failure
            newBookmarkedProperties[propertyId] = isCurrentlyBookmarked;
            setBookmarkedProperties(newBookmarkedProperties);
            alert('Error sending bookmark request');
        }
    };

      const filteredProperties = propertyData.map(property => ({
        ...property,
        isBookmarked: !!bookmarkedProperties[property.id],  // Add bookmark status directly to the property data
    })).filter(property =>
        (property.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="buyer-property-data-main-div">
            <div className="buyer-property-data-card1">
                <h1 className="h1-buyer-property">Property Details</h1>
                <div className="search-box-approve-request-property-container">
                    <input
                        type="text"
                        className="search-box-approve-request-property-container"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        placeholder="Search by City"
                    />
                </div>
                <div className="buyer-property-data-list">

                    {filteredProperties.map((propertyData, index) => (

                        <div className="buyer-property-data-li" key={index}>
                            <button
                                onClick={() => handleBookmarkClick(propertyData.id)}
                                className="bookmark-button"
                            >
                                {bookmarkedProperties[propertyData.id] ? (
                                    <FaHeart color="red" size={30} />  // Filled heart for bookmarked
                                ) : (
                                    <FaRegHeart color="gray" size={30} />  // Outline heart for not bookmarked
                                )}
                            </button>
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
                            <p className="buyer-property-data-p"><strong>Selling Type:</strong> {propertyData.sellingType}</p>
                            <p className="buyer-property-data-p"><strong>Property Type:</strong> {propertyData.propertyType}</p>
                            <p className="buyer-property-data-p"><strong>Flat Type:</strong> {propertyData.flatType}</p>
                            <p className="buyer-property-data-p"><strong>City:</strong> {propertyData.city}</p>
                            <p className="buyer-property-data-p"><strong>Locality:</strong> {propertyData.locality}</p>
                            <p className="buyer-property-data-p"><strong>Address:</strong> {propertyData.address}</p>
                            <p className="buyer-property-data-p"><strong>Bedrooms:</strong> {propertyData.bedrooms}</p>
                            <p className="buyer-property-data-p"><strong>Balconies:</strong> {propertyData.balconies}</p>
                            <p className="buyer-property-data-p"><strong>Carpet Area:</strong> {propertyData.carpetArea}</p>
                            <p className="buyer-property-data-p"><strong>Total Floors:</strong> {propertyData.totalFloors}</p>
                            <p className="buyer-property-data-p"><strong>Property Floor:</strong> {propertyData.propertyFloor}</p>
                            <p className="buyer-property-data-p"><strong>Possession:</strong> {propertyData.possession}</p>
                            <p className="buyer-property-data-p"><strong>Expected Price:</strong> {propertyData.expectedPrice}</p>
                            <p className="buyer-property-data-p"><strong>Price Per Sq Ft:</strong> {propertyData.pricePerSqFt}</p>
                         
                            <Button onClick={() => buiedProperty(propertyData.id)}
                                className="btn-buy-property">Buy Property</Button>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}
export default ViewAllProperties;
