import Profile from "../../common/update-profile/Profile";
import AdminSidebar from "../sidebar/AdminSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewAllAgents from "../view-all-agents/ViewAllAgents";
import ViewAllSellers from "../view-all-sellers/ViewAllSellers";
import ViewAllBuyers from "../view-all-buyers/ViewAllBuyers";
import GetApproveRequestPropertyDetails from "../get-approve-request-property-details/GetApproveRequestPropertyDetails";
import GetPropertyDetails from "../../common/get-property-details/GetPropertyDetails";


function AdminDashboard() {
    return (

        <>
            <AdminSidebar />
            <div style={{ flex: 1, padding: "20px" }}>
                <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="view-all-buyers" element={<ViewAllBuyers />} />
                    <Route path="view-all-agents" element={<ViewAllAgents />} />
                    <Route path="view-all-sellers" element={<ViewAllSellers />} />
                    <Route path="get-property-details" element={<GetPropertyDetails />} />
                    <Route path="get-approve-request-property-details" element={<GetApproveRequestPropertyDetails />} />
                </Routes>
            </div>
        </>
    );
}

export default AdminDashboard;