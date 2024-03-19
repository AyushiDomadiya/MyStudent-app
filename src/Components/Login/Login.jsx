import React, { useRef,useState } from 'react';
import { Link, useHistory,useLocation } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import config from './config';
import { CiLock } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useHistory();
  const location = useLocation();
  const emailr = location.state?.email || "";
  console.log({emailr})
  
  const errors = {
      email_id: "invalid username",
      pass: "invalid password"
    };

  const handleUserChange = (e) =>{
    setUser(e.target.value)
  }
   const handleSubmit =async (event) => {
      //Prevent page reload
      // Prevent the default form submission behavior
        event.preventDefault();

        const response =await axios.post(`${config.ApiUrl}Registration/GetUserData`,{
          Email: user,
          Password:password,
        });
        const userRes = response.data;
        console.log('response of ',userRes);
        if(userRes === "Done")
        {
          navigate.push({
            pathname:'/AddPersonal',
            state:{email: user}
          })
          Swal.fire({
            title: 'Sucessfully Login !',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
            })
        }
        else{
          // Swal.fire({
          //   title: 'Please Enter Correct Email and Password!',
          //   icon: 'success',
          //   showConfirmButton: false,
          //   timer: 1500
          // })
          toast.error('Invalid Email Or Password !');
        }
    }; 

      // Generate JSX code for error message
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
    //const location = useLocation();
    //const Relation = location.state?.Relation || "";
  
    const customToastStyle = {
      fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      fontSize: '16px',
      fontWeight: 'bold',
      position: 'top center',
    };

    return (
        <div className="app">
        <div className="login-form">
            <div className="title">Log In</div>
           
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label>Username </label>
                  {/* <input type="email" name="email_id" defaultValue={emailr} placeholder='Enter Email-id' onChange={handleUserChange} required /> */}
                  <input type="email" name="email_id" value={user} placeholder='Enter Email-id' onChange={handleUserChange} required />
                   {renderErrorMessage("email_id")}
                </div>
                <div className="input-container">
                  <label>Password </label>
                  <input type="password" name="pass" value={password} placeholder='Enter Password'  onChange={(e) => setPassword(e.target.value)} required />
                   {renderErrorMessage("pass")}
                </div>
                <div className='forgotpsd-link'>
                  <p><Link to='/ForgotPassword'>Forgot Password ?</Link></p>
                </div>
                <div className="button-container">
                    <button type="submit" className='button' onClick={()=>handleSubmit}>Login</button>
                </div>
                <div className='register-link'>
                  <p>Don't have an account? <Link to='/Registration' >Register</Link></p>
                </div>
              <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
            </form>
            
        </div>
    </div>
    )
  
}

export default Login

{/*
const Login = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useHistory();

    // User Login info
    const database = [
      {
        username: "admin@gmail.com",
        password: "admin123"
      },
      {
        username: "user2@gmail.com",
        password: "pass2"
      }
    ];

    const errors = {
      email_id: "invalid username",
      pass: "invalid password"
    };
    const handleUserChange = (e) => {
      setUser(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (event) => {
      //Prevent page reload
      // Prevent the default form submission behavior
      event.preventDefault();

      var { email_id, pass } = document.forms[0];

      // Find user login info
      const userData = database.find((user) => user.username === email_id.value);

      // Compare user info
      if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
          } 
          else {
           // setIsSubmitted(true);
           navigate.push({
            pathname: '/AddPersonal',
            state:{email: userData.username}
          });
          }
      } 
      else {
        // Username not found
        setErrorMessages({ name: "email_id", message: errors.email_id });
      }
    }; 
      // Generate JSX code for error message
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
    //const location = useLocation();
    //const Relation = location.state?.Relation || "";
  
   
    return (
        <div className="app">
        <div className="login-form">
            <div className="title">Log In</div>
           
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label>Username </label>
                  <input type="email" name="email_id" value={user} placeholder='Enter Email-id' onChange={handleUserChange} required />
                   {renderErrorMessage("email_id")}
                </div>
                <div className="input-container">
                  <label>Password </label>
                  <input type="password" name="pass" value={password} placeholder='Enter Password' onChange={handlePasswordChange} required />
                   {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
            
                <button type="submit" className='button'>Login</button>
            </div>
                <div className='register-link'>
                  <p>Don't have an account? <Link to='/Registration' >Register</Link></p>
              </div>
            </form>
            
        </div>
    </div>
    )
  
}

export default Login */}