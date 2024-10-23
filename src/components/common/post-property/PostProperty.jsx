import React, { useState } from "react";
import "./PostProperty.css";
import axios from "axios";

const PropertyForm = () => {
    const [property, setProperty] = useState({
        sellingType: 'Sell',
        propertyType: '',
        flatType: '',
        city: '',
        locality: '',
        address: '',
        bedrooms: 0,
        balconies: 0,
        carpetArea: 0,
        totalFloors: 0,
        propertyFloor: 0,
        possession: '',
        expectedPrice: 0,
        pricePerSqFt: 0
   
    });

   

    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    //   const [property, setProperty] = useState(null); // To hold the response with property data

    console.log(property);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({
            ...property,
            [name]: value
        });
    };
    console.log(property);
    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
  
        // Create FormData to append all fields and images
        const formData = new FormData();
        
        formData.append("property", JSON.stringify(property));
        Object.keys(property).forEach((key) => {
            formData.append(key, property[key]);
        });

        // Append all images to the FormData
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        // setProperty(form);
        // setProperty(form);
        formData.append("userId",userId);
        console.log(formData);
        try {
            //   const response = await fetch('http://localhost:8088/api/properties/addProperty', {
            //     method: 'POST',
            //     body: form, // Send the FormData as the request body
            //   });
            const response = await axios.post('http://localhost:8088/api/properties/addProperty', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response && response.data && response.data.message) {
                // Update the status message with the success message from backend
                setMessage(response.data.message);
                alert(response.data.message);  // Optionally show a browser alert
            }
        } catch (error) {
            console.error('Error uploading property:', error);
            alert('Failed to upload property');
            setMessage('Failed to upload property'); // Show error message
        }

    };

    return (
        <div className="post-property-div">
            <form onSubmit={handleSubmit} className="form-post-property">
                <h2 className="h2-post-property">Post Property</h2>
                <div className="div-post-property">
                    <label>Selling Type</label>
                    <input
                        type="text"
                        name="sellingType"
                        value={property.sellingType}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                <div className="div-post-property">
                    <label>Property Type</label>
                    <input
                        type="text"
                        name="propertyType"
                        value={property.propertyType}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Flat Type</label>
                    <input
                        type="text"
                        name="flatType"
                        value={property.flatType}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={property.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Locality</label>
                    <input
                        type="text"
                        name="locality"
                        value={property.locality}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={property.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Bedrooms</label>
                    <input
                        type="number"
                        name="bedrooms"
                        value={property.bedrooms}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Balconies</label>
                    <input
                        type="number"
                        name="balconies"
                        value={property.balconies}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Carpet Area (sq.ft.)</label>
                    <input
                        type="number"
                        name="carpetArea"
                        value={property.carpetArea}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Total Floors</label>
                    <input
                        type="number"
                        name="totalFloors"
                        value={property.totalFloors}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Property Floor</label>
                    <input
                        type="number"
                        name="propertyFloor"
                        value={property.propertyFloor}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Possession</label>
                    <input
                        type="text"
                        name="possession"
                        value={property.possession}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Expected Price</label>
                    <input
                        type="number"
                        name="expectedPrice"
                        value={property.expectedPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Price per Sq.Ft.</label>
                    <input
                        type="number"
                        name="pricePerSqFt"
                        value={property.pricePerSqFt}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-post-property">
                    <label>Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple={true}
                        onChange={handleImageChange}
                    />
                </div>

                <button className="btn-post-property" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PropertyForm;

