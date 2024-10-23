import React, { useState } from 'react';
import "./BuyerSidebar.css";
import { useNavigate } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText, } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import 'font-awesome/css/font-awesome.min.css';

const BuyerSidebar = () => {

    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (

        <SideNav
            onSelect={selected => {
                console.log(selected);
                if (selected === "logout") {
                    localStorage.removeItem("userId");
                    navigate("/");
                }
                else if (selected && selected !== 'undefined') {
                    navigate(`/buyer-dashboard/${selected}`);
                }
                else {
                    navigate("/buyer-dashboard/profile");
                }
            }}
            className="mysidenav"
            style={{
                backgroundColor: '#b0099f',
                position: 'fixed',
                width: expanded ? '300px' : '70px',
                transition: 'width 0.3s',

            }}
        >
            <SideNav.Toggle onClick={handleToggle} />
            <SideNav.Nav defaultSelected="profile">
                <NavItem eventKey="profile">
                    <NavIcon><i className='fa fa-fw fa-user' style={{ fontSize: "18px" }}></i></NavIcon>
                    {expanded && (
                        <NavText style={{ fontSize: "20px", color: "white" }}>
                            Profile
                        </NavText>
                    )}
                </NavItem>
                <NavItem eventKey="view-all-properties">
                    <NavIcon><i className='fa fa-fw fa-list' style={{ fontSize: "18px" }}></i></NavIcon>
                    {expanded && (
                        <NavText style={{ fontSize: "20px", color: "white" }}>
                            List of Properties
                        </NavText>
                    )}
                </NavItem>
                <NavItem eventKey="bookmark">
                    <NavIcon><i className='fa fa-fw fa-bookmark' style={{ fontSize: "18px" }}></i></NavIcon>
                    {expanded && (
                        <NavText style={{ fontSize: "20px", color: "white" }}>
                            Bookmark
                        </NavText>
                    )}
                </NavItem>
                <NavItem eventKey="chat">
                    <NavIcon><i className='fa fa-fw fa-comment-dots' style={{ fontSize: "18px" }}></i></NavIcon>
                    {expanded && (
                        <NavText style={{ fontSize: "20px", color: "white" }}>
                            Chat
                        </NavText>
                    )}
                </NavItem>
                <NavItem eventKey="logout">
                    <NavIcon><i className='fa fa-fw fa-sign-out' style={{ fontSize: "18px" }}></i></NavIcon>
                    {expanded && (
                        <NavText style={{ fontSize: "20px", color: "white" }}
                        >Logout</NavText>
                    )}
                </NavItem>
            </SideNav.Nav>

        </SideNav>


    );
};

export default BuyerSidebar;
