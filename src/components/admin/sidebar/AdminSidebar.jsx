import React from 'react';
import "./AdminSidebar.css";
import { useNavigate } from 'react-router-dom';
import SideNav, { Toggle, NavItem, NavIcon, NavText, } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import 'font-awesome/css/font-awesome.min.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <SideNav
      onSelect={selected => {
        console.log(selected);
         if (selected === "logout") {
          localStorage.removeItem("userId");
          navigate("/");
        }
        else if (selected && selected !== 'undefined') {
          navigate(`/admin-dashboard/${selected}`);
        }
         else {
          navigate("/admin-dashboard/profile");
        }


      }}
      className="mysidenav"
      style={{ backgroundColor: '#b0099f', position: 'fixed' }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="profile">
        <NavItem eventKey="profile">
          <NavIcon><i className='fa fa-fw fa-user' style={{ fontSize: "18px" }}></i></NavIcon>
          <NavText style={{ fontSize: "20px", color: "white" }}>
            Profile
            {/* <Link to="/admin-dashboard/profile" style={{ color: 'white' }}> Profile</Link> */}
          </NavText>
        </NavItem>
        <NavItem eventKey="view-all-buyers">
          <NavIcon><i className='fa fa-fw fa-list' style={{ fontSize: "18px" }}></i></NavIcon>
          <NavText style={{ fontSize: "20px", color: "white" }}>
            View all Buyers
          </NavText>
        </NavItem>
        <NavItem eventKey="view-all-agents">
          <NavIcon><i className='fa fa-fw fa-list' style={{ fontSize: "18px" }}></i></NavIcon>
          <NavText style={{ fontSize: "20px", color: "white" }}>
            View all Agents
          </NavText>
        </NavItem>
        <NavItem eventKey="view-all-sellers">
          <NavIcon><i className='fa fa-fw fa-list' style={{ fontSize: "18px" }}></i></NavIcon>
          <NavText style={{ fontSize: "20px", color: "white" }}>
            View all Sellers
          </NavText>
        </NavItem>
        <NavItem eventKey="get-property-details">
          <NavIcon><i className='fa fa-fw fa-list' style={{ fontSize: "18px" }}></i></NavIcon>
          <NavText style={{ fontSize: "20px", color: "white" }}>
            List of Properties
          </NavText>
        </NavItem>
        <NavItem eventKey="get-approve-request-property-details">
          <NavIcon><i className='fa fa-fw fa-check' style={{ fontSize: "18px" }}></i></NavIcon>
          <NavText style={{ fontSize: "20px", color: "white" }}>
            Approve Property
          </NavText>
        </NavItem>
        <NavItem eventKey="logout">
          <NavIcon><i className='fa fa-fw fa-sign-out' style={{ fontSize: "18px" }}></i></NavIcon>
          <NavText style={{ fontSize: "20px", color: "white" }}
            >Logout</NavText>
        </NavItem>
      </SideNav.Nav>

    </SideNav>


  );
};

export default AdminSidebar;
