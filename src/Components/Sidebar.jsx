import React, { useState } from 'react';
import { CiLogout } from "react-icons/ci";
import {
    FaBars,
    FaUser,
    FaDatabase
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import Dropdown from '../Components/Pages/Dropdown';
import './Sidebar.css';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Home",
            name:"Home",
            icon:<IoHome />
        },
        {
            path:"/Familydetail",
            name:"Family",
            icon:<MdOutlineFamilyRestroom />
        },
        {
            path:"/AddPersonal",
            name:"Personal",
            icon:<FaUser />
        },
        {
            path:"/Fetchdata",
            name:"Fetchdata",
            icon:<FaDatabase/>
        },
        {
            path:"/",
            name:"Logout",
            icon:<CiLogout />
        }
    ]
    return (
        <div>
            <header>
            <h1> Welcome </h1>
             <Dropdown/>
            </header>
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="Sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">student</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
        </div>
    );
};

export default Sidebar;