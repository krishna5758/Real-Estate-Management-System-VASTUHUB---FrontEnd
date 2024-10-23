import Profile from "../../common/update-profile/Profile";
import Bookmark from "../bookmark/Bookmark";
import BuyerChat from "../chat/BuyerChat";
import BuyerSidebar from "../sidebar/BuyerSidebar";
import ViewAllProperties from "../view-all-properties/ViewAllProperties";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function BuyerDashboard() {
    return (
        <>
            <BuyerSidebar />
            <div style={{ flex: 1, padding: "20px" }}>
                <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="view-all-properties" element={<ViewAllProperties />} />
                    <Route path="bookmark" element={<Bookmark />} />
                    <Route path="chat" element={<BuyerChat />} />
                </Routes>
            </div>
        </>
    );
}

export default BuyerDashboard;