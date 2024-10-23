import React, { useState } from "react";
import { agentDropDown } from "../NavItems";
import { Link, useNavigate } from "react-router-dom";
import "./AgentDropDown.css";

function AgentDropDown() {
    const [dropdown, setDropDown] = useState(false);
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        // setDropDown(false); // Close the dropdown when an item is clicked
        const userId = localStorage.getItem('userId');
        console.log(userId);
        if (userId !== null && userId !== undefined && userId.trim() !== '') {
            setDropDown(false);
            navigate(path);
        }
        else {
            // alert("Please login first");
            navigate("/login");
        }
    };
    return (
        <>
            <ul
                className={dropdown ? "agent-submenu clicked" : "agent-submenu"}
                onClick={() => setDropDown(!dropdown)}>
                {
                    agentDropDown.map((item) => {
                        return (
                            <li key={item.id}>
                                <a to={item.path} className={item.cName}
                                    onClick={() => handleNavigate(item.path)} >
                                    {item.title}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    );

}

export default AgentDropDown;