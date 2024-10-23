import React, { useState } from "react";
import { sellerDropDown } from "../NavItems";
import { Link, useNavigate } from "react-router-dom";
import "./SellerDropDown.css";

function SellerDropDown() {
    const [dropdown, setDropDown] = useState(false);
    const navigate = useNavigate();
    
    const handleNavigate = (path) => {
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
                className={dropdown ? "seller-submenu clicked" : "seller-submenu"}
                onClick={() => setDropDown(!dropdown)}>
                {
                    sellerDropDown.map((item) => {
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

export default SellerDropDown;