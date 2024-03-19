import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Personaldetail.css';

const Personaldetail = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const firstName = location.state?.firstName || "";
    const lastName = location.state?.lastName || "";
    const gender = location.state?.gender || "";
    const birthday = location.state?.birthday || "";
    const mobileNumber = location.state?.mobileNumber || "";
  return (
    <Sidebar>
        <div className='personal-detail-main'>
        {/*<h2><center>Personal Details</center></h2>*/}
            <form>
               
                    <h2>Personal Detail</h2>
                    <label>Email:  {email}</label>
                    <p></p>
                    <label>First Name:  {firstName}</label>
                    <p></p>
                    <label>Last Name:  {lastName}</label>
                    <p></p>
                    <label>Gender:  {gender}</label>
                    <p></p>
                    <label>Date of Birth:  {birthday}</label>
                    <p></p>
                    <label>Mobile Number:  {mobileNumber}</label>
                    <p></p>
                
            </form>
        </div>
    </Sidebar>
  )
}

export default Personaldetail
