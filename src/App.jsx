import './App.css';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import NavbarTop from './components/common/navbar/NavbarTop';
import Home from './components/common/home/Home';
import ForgotPassword from './components/login/forgot_password/ForgotPassword';
import ResetPassword from './components/login/forgot_password/ResetPassword';
import MainSearchBar from './components/common/home/searchbar/MainSearchBar';
import PropertyForm from './components/common/post-property/PostProperty';
import HireAgent from './components/seller/hire-agent/HireAgent';
// import { Layout } from "antd";
import GetPropertyDetails from './components/common/get-property-details/GetPropertyDetails';
import ViewAllAgents from './components/admin/view-all-agents/ViewAllAgents';
import ViewAllBuyers from './components/admin/view-all-buyers/ViewAllBuyers';
import ViewAllSellers from './components/admin/view-all-sellers/ViewAllSellers';
import GetApproveRequestPropertyDetails from './components/admin/get-approve-request-property-details/GetApproveRequestPropertyDetails';
import Profile from './components/common/update-profile/Profile';
import SellerDashboard from './components/seller/dashboard/SellerDashboard';
import AgentDashboard from './components/agent/dashboard/AgentDashboard';
import SellerSidebar from './components/seller/sidebar/SellerSidebar';
import AgentSidebar from './components/agent/sidebar/AgentSidebar';
import AdminSidebar from './components/admin/sidebar/AdminSidebar';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import GetApprovedPropertyList from './components/agent/get-approved-property-list/GetApprovedPropertyList';
import SendRequestToAdmin from './components/agent/send-request-to-admin/SendRequestToAdmin';
import ViewAllProperties from './components/buyer/view-all-properties/ViewAllProperties';
import BuyerChat from './components/buyer/chat/BuyerChat';
import Bookmark from './components/buyer/bookmark/Bookmark';
import BuyerSidebar from './components/buyer/sidebar/BuyerSidebar';
import BuyerDashboard from './components/buyer/dashboard/BuyerDashboard';


// const{Header,Sider} = Layout;
function App() {


  return (

    <div className='App'>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="view-all-buyers" element={<ViewAllBuyers />} />
            <Route path="view-all-agents" element={<ViewAllAgents />} />
            <Route path="view-all-sellers" element={<ViewAllSellers />} />
            <Route path="get-property-details" element={<GetPropertyDetails />} />
            <Route path="get-approve-request-property-details" element={<GetApproveRequestPropertyDetails />} />
          </Route>

          <Route path="/agent-dashboard" element={<AgentDashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="get-property-details" element={<GetPropertyDetails />} />
            <Route path="property-form" element={<PropertyForm />} />
            <Route path="send-request-to-admin" element={<SendRequestToAdmin />} />
            <Route path="get-approve-property-list" element={<GetApprovedPropertyList />} />
          </Route>

          <Route path="/buyer-dashboard" element={<BuyerDashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="view-all-properties" element={<ViewAllProperties />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="chat" element={<BuyerChat />} />
          </Route>

          <Route path="/seller-dashboard" element={<SellerDashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="property-form" element={<PropertyForm />} />
            <Route path="get-property-details" element={<GetPropertyDetails />} />
            <Route path="hire-agent" element={<HireAgent />} />
          </Route>
        </Routes>

      </Router>

    </div>

  );
}

export default App
