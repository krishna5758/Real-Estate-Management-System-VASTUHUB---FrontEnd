import { useNavigate } from "react-router-dom";
import AgentSidebar from "../sidebar/AgentSidebar";
import PropertyForm from "../../common/post-property/PostProperty";
import SendRequestToAdmin from "../send-request-to-admin/SendRequestToAdmin";
import GetApprovedPropertyList from "../get-approved-property-list/GetApprovedPropertyList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../../common/update-profile/Profile";
import GetPropertyDetails from "../../common/get-property-details/GetPropertyDetails";

function AgentDashboard() {

   return (
      <>
         <AgentSidebar />
         <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
               <Route path="profile" element={<Profile />} />
               <Route path="get-property-details" element={<GetPropertyDetails />} />
               <Route path="property-form" element={<PropertyForm />} />
               <Route path="send-request-to-admin" element={<SendRequestToAdmin />} />
               <Route path="get-approve-property-list" element={<GetApprovedPropertyList />} />
             </Routes>
         </div>
      </>
   );
   
}

export default AgentDashboard;