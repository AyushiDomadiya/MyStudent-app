import moment from 'moment';
import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import '../Pages/AddPersonal.css';
import Sidebar from '../Sidebar';

const AddPersonal = () => {
   
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+1"); 
    const [address, setAddress] = useState("");
    // React States
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate=useHistory();

    const location = useLocation();
    const email = location.state?.email || "";

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate.push({
            pathname:'/Personaldetail',
            state: {
                    email:email,
                    firstName:firstName,
                    lastName:lastName,
                    gender:gender,
                    birthday:birthday,
                    mobileNumber:mobileNumber,
                    address:address
                  }
        });
    }
    
   
  const countryCodes = ["+1", "+91", "+201", "+262", "+90"]; // Add more country codes as needed

  const renderForm = (
    <div className="form">
    <form onSubmit={handleSubmit}>
       <h2>Personal Detail</h2>
        <div className="input-container">
            <label>Email: {email}</label>

             
        </div>
        <div className="input-container">
            <label>First Name: </label>
            <input type="text"
               name="firstname"
               value={firstName} 
               placeholder='Enter First Name'
               onChange={(e) => setFirstName(e.target.value)} 
               required />
        </div>
        <div className="input-container">
          <label>Last Name:</label>
          <input type="text"
            name="lastname"
            value={lastName}
            placeholder='Enter Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Gender:</label>
          <div className="radio-group">
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              required
            />
            <label>Male</label>

            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            <label>Female</label>
        </div>
        </div>
        <div className="input-container">
          <label>Birthday:</label>
          <input
            type="date"
            value={birthday}
             max={moment(Date()).format("YYYY-MM-DD")}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Mobile Number:</label>
          <div className="mobile-number-container">
            <select
              value={countryCode}
              className="country-code"
              onChange={(e) => setCountryCode(e.target.value)} >
              {countryCodes.map((code) => (
                <option key={code} value={code} defaultChecked={code.indexOf(1)}>
                  {code}
                </option>
              ))}
            </select>
            <input
              type="text"
              pattern="[0-9]{10}"
              title="Phone number 10 digit with 0-9"
              value={mobileNumber}
              placeholder='Enter Contact Number'
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="button-container">
                    <button type="submit" className='button' onClick={()=>handleSubmit}>Update</button>
          </div>
        
    </form>
    </div>  
  );
  return (
    <Sidebar>
      <div className="addusermainclass">
     {/* <h2><center>Personal Details</center></h2>*/}
      <div className="adduser-info-form">
          
            {renderForm}      
      </div>
      </div>
    </Sidebar>
  )
}

export default AddPersonal
{/*<div className='containerp'>
      <h2>Personal Details</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-groupp'>
            <label>Email:</label>
            <p>{email}</p>
              <label>First Name:</label>
              <input 
              type="text" 
              value={firstName}
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
              required 
              />
            </div>
            <div className='form-groupp'>
              <label>Last Name:</label>
              <input
              type='text'
              value={lastName}
              placeholder='Last Name'
              onChange={(e)=>setLastName(e.target.value)}
              required
              />
            </div>
            <div className='form-groupp'>
              <label>Gender:</label>
              <div className="radio-groupp">
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  required
                />
                <label>Male</label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  required
                />
                <label>Female</label>
              </div>
            </div>
            <div className="form-groupp">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={birthday}
                max={moment(Date()).format("YYYY-MM-DD")}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <div className='form-groupp'>
            <label>Mobile Number:</label>
              <div className='phone_number'>
                <select
                  value={countryCode}
                  className="country-code"
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                {countryCodes.map((code) => (
                  <option key={code} value={code} defaultChecked={code.indexOf(1)}>
                    {code}
                  </option>
                ))}
              </select>
                <input
                className='phone'
                  type="number"
                  pattern="[0-9]{10}"
                  title="Phone number 10 digit with 0-9"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button type="submit" className='save'> Submit </button>
            </div>
          </form>
          </div>
           */}