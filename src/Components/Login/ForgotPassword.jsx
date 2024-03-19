import {React,useState} from 'react'
import moment from 'moment';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import config from './config';

const ForgotPassword = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user,setUser] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [birthday,setBirthday]=useState('');
  const navigate = useHistory();

  const errors = {
    user: "invalid username",
  };
  const customToastStyle = {
    fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
    fontSize: '16px',
    fontWeight: 'bold',
    position: 'top center',
  };

  const handleSubmit =async (event) => {
      //Prevent page reload
      event.preventDefault();
      // Check User is Exist or not
      const emailresponse =await axios.post(`${config.ApiUrl}Registration/CheckUserExist`,{
        Email: user
      });
      const userERes = emailresponse.data;
      console.log('response of : ',userERes);
      if(userERes === "Found")
      {     
            const birthdayresponse= await axios.post(`${config.ApiUrl}Registration/VerifyUserBirthdate`,{
              email:user,
              birthday: birthday
            });
            const birthdayresult = birthdayresponse.data;
            console.log(birthdayresult);
            if(birthdayresult === "birthdaysuccess"){
                setIsSubmitted(true);    
            }
            else{
                toast.error("Birthdate is not valid !!!");
            }
      }
      else{
        console.log("User Not Found!!!");
        toast.error("User Not Found !!!");
      }
      //setIsSubmitted(true);
  };

  const handleReset =async (event) => {
    //Prevent page reload
    event.preventDefault();

    //Condition to compare password and Confirm Password
    if(password !== cpassword)
    {
        toast.error("The Passwords Not match");
        return false; // The form won't submit
     }
    else
    {
        Swal.fire({
            title: 'Password Sucessfully Changed !',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
        })

        await axios.put(`${config.ApiUrl}Registration/ResetPassword`,{
            "email": user ,
            "password": password
        });
        console.log("Password Changed")
    }
    navigate.push({
      pathname: '/',
      state:{email: user}
    })
  };
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="user" value={user} onChange={(e) => setUser(e.target.value)} placeholder='Enter Email'required />
          {renderErrorMessage("user")}
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
        <div className="button-container">
           <button type="submit" className='button' onClick={()=>handleSubmit}>Submit</button>
        </div>
        <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </form>
    </div>
  );
  const ResetForm = (
    <div className="form">
      <form onSubmit={handleReset}>
        <div className="input-container">
          <label>New Password </label>
          <input type="password"  value={password} placeholder='Enter New Password' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password"  value={cpassword} placeholder='Enter Confirm Password' onChange={(e) => setCPassword(e.target.value)} required />
        </div>
        <div className="button-container">
           <button type="submit" className='button' onClick={()=>handleReset}>Reset</button>
        </div>
        <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
      </form>
    </div>
  );
  
  return (
    <div className="app">
      <div className="login-form">
        <Link name="back-link" to='/' ><IoMdArrowRoundBack className='back-icon'/></Link>
        <div className="title">Reset Password</div>
        {/* {isSubmitted ? <div>User is successfully logged in</div> : renderForm} */}
        {isSubmitted ? ResetForm : renderForm}
      </div>
    </div>
  );

}

export default ForgotPassword
