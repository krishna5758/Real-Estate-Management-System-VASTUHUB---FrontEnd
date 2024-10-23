import { useEffect, useState } from "react";
import "./Bookmark.css";
function Bookmark() {
    const [bookmarkedPropertyData, setBookmarkedPropertyData] = useState([]);

    useEffect(() => {
        const fetchBookmarkedPropertyDetails = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await fetch(`http://localhost:8088/api/properties/getBookmarkedProperties?status=Bookmarked&userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                });
                const data = await response.json();

                if (Array.isArray(data.bookmarkedProperties)) {
                    setBookmarkedPropertyData(data.bookmarkedProperties);
                } else {
                    console.error('Expected Property Data to be an array:', data.bookmarkedProperties);
                }

            } catch (error) {
                alert('Error fetching agents:', error);
            }
        };
        fetchBookmarkedPropertyDetails();
    }, []);

    return (
        <div className="view-all-get-bookmarked-property-list">
            <div className="view-all-get-bookmarked-property-card-container">
                <h2 className="h2-bookmarked-property-list">Bookmarked Property List</h2>
                <div className="get-bookmarked-property-data-list">
                    {bookmarkedPropertyData && bookmarkedPropertyData.length > 0 ? (
                        bookmarkedPropertyData.map((property, index) => (
                            <div key={index} className="view-all-get-bookmarked-property-card">
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
                                <p className="bookmarked-property-list-p"><strong>Selling Type:</strong> {property.sellingType}</p>
                                <p className="bookmarked-property-list-p"><strong>Property Type:</strong> {property.propertyType}</p>
                                <p className="bookmarked-property-list-p"><strong>Flat Type:</strong> {property.flatType}</p>
                                <p className="bookmarked-property-list-p"><strong>City:</strong> {property.city}</p>
                                <p className="bookmarked-property-list-p"><strong>Locality:</strong> {property.locality}</p>
                                <p className="bookmarked-property-list-p"><strong>Address:</strong> {property.address}</p>
                                <p className="bookmarked-property-list-p"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                <p className="bookmarked-property-list-p"><strong>Balconies:</strong> {property.balconies}</p>
                                <p className="bookmarked-property-list-p"><strong>Carpet Area:</strong> {property.carpetArea}</p>
                                <p className="bookmarked-property-list-p"><strong>Total Floors:</strong> {property.totalFloors}</p>
                                <p className="bookmarked-property-list-p"><strong>Property Floor:</strong> {property.propertyFloor}</p>
                                <p className="bookmarked-property-list-p"><strong>Possession:</strong> {property.possession}</p>
                                <p className="bookmarked-property-list-p"><strong>Expected Price:</strong> {property.expectedPrice}</p>
                                <p className="bookmarked-property-list-p"><strong>Price Per Sq Ft:</strong> {property.pricePerSqFt}</p>
                              </div>

                        ))
                    ) : (
                        <div>No agents found</div>
                    )}
                </div>
            </div>
        </div>
    );

}
export default Bookmark;
