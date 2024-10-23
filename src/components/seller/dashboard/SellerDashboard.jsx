import GetPropertyDetails from "../../common/get-property-details/GetPropertyDetails";
import PropertyForm from "../../common/post-property/PostProperty";
import Profile from "../../common/update-profile/Profile";
import HireAgent from "../hire-agent/HireAgent";
import SellerSidebar from "../sidebar/SellerSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function SellerDashboard() {
    return (

        <>
            <SellerSidebar />
            <div style={{ flex: 1, padding: "20px" }}>
                <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="property-form" element={<PropertyForm />} />
                    <Route path="get-property-details" element={<GetPropertyDetails />} />
                    <Route path="hire-agent" element={<HireAgent />} />
                </Routes>
            </div>
        </>
    );
}

export default SellerDashboard;