import person from '../Assets/person.png';
import user from '../Assets/user.png';
import './Dropdown.css';

import React, { useEffect, useRef, useState } from 'react';

function Dropdown(){

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) =>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });
  
  return(

    <div className="Dropdown">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' >
          <img onClick={() => setOpen(!open)} src={user} alt='/'></img>
        </div>
        {
          open &&
        
        <div className={`dropdown-menu`} >
          <ul>
            <DropdownItem img={person} text = {"My Profile"} path='/'/>
            <DropdownItem text={"Logout"} path='/' />
          </ul>
        </div>
}
        </div>
        </div>
    )
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img alt='/AddPersonal' src={props.img}></img>
      <a href='/'> {props.text} </a>
    </li>
  );
}


export default Dropdown;


