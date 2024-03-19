import React, { useState , useEffect} from 'react'
import './Registration.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import moment from 'moment';
import config from './config';
import { IoMdArrowRoundBack } from "react-icons/io";
const Registration = () => {

    //this varaible store all the response of api
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [birthday,setBirthday]=useState('');
    const navigate = useHistory();
  
      useEffect(()=>{
        
      },[])
      
     
      const errors = {
        email_id: "invalid username",
        pass: "invalid password"
      };

    const handleSubmit =async (event) =>{
          
      event.preventDefault();
      // Check User is Exist or not
      const emailresponse =await axios.post(`${config.ApiUrl}Registration/CheckUserExist`,{
          Email: user
        });
      const userERes = emailresponse.data;
      console.log('response of ',userERes);
      if(userERes === "Found")
      {
            toast.error("User already exist !!!");
            return;
      }
      else
      {
          //Condition to compare password and Confirm Password
          if(password !== cpassword)
          {
              toast.error("The passwords doesn't match");
              return false; // The form won't submit
           }
          else
          {   // The form will submit
              Swal.fire({
              title: 'Registration Sucessfully done !',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
              })

              const url = `${config.ApiUrl}Registration/UserRegistration`;
              const data = {
                "name":name,
                "email": user,
                "password": password,
                "birthday":birthday
              }
            axios.post(url, data)
        }
        navigate.push({
          pathname: '/',
          state:{email: user}
        })
      }
    }

      const customToastStyle = {
        fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        fontSize: '16px',
        fontWeight: 'bold',
        position: 'top center',
      };

    return (
      <div className="app">
        <div className="registration-form">
        <Link to='/' ><IoMdArrowRoundBack className='back-icon'/></Link>
           <div className="title">Sign Up</div>
            <form onSubmit={handleSubmit}>
              
            <div className="input-container">
                <label>Username </label>
                <input type="text" name="name" value={name} placeholder='Enter User Name' onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="input-container">
                <label>Email </label>
                <input type="email" name="email_id" value={user} placeholder='Enter Email-id' onChange={(e) => setUser(e.target.value)} required />
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
                <label>Password </label>
                <input type="password"  value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="input-container">
                <label>Confirm Password </label>
                <input type="password"  value={cpassword} placeholder='Enter Confirm Password' onChange={(e) => setCPassword(e.target.value)} required />
              </div>
              <div className="button-container">
                <button type="submit" className='button' onClick={()=>handleSubmit}>Sign Up</button>
              </div>
              <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="top-center" reverseOrder={false} />
            </form>
         </div>     
      </div>   
      )
    
}

export default Registration

{/*const Registration = () => {

    //this varaible store all the response of api
    const[data,setData] = useState([]);
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
  
      // React States
      const [errorMessages, setErrorMessages] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
  
      const navigate = useHistory();
  
      useEffect(()=>{
        getData();
      },[])
      
      //Get data from database
      const getData = () => {
        axios.get('https://localhost:7147/api/Registration')
        .then((result) =>{
            setData(result.data);
        })
        .catch((error) =>{
          console.log(error);
        })
      }

  
      const errors = {
        email_id: "invalid username",
        pass: "invalid password"
      };


      const handleSubmit = (event) =>{

          event.preventDefault();

          const url = 'https://localhost:7147/api/Registration';
          const data = {
                "email": user,
                "password": password
          }

          axios.post(url, data)
          .then((result) =>{
            getData();
          })
          
          navigate.push({
            pathname: '/'
          })
      }

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
           <div className="title">Sign Up</div>
            <form onSubmit={handleSubmit}>
                   
              <div className="input-container">
                <label>Username </label>
                <input type="email" name="email_id" value={user} placeholder='Enter Email-id' onChange={(e) => setUser(e.target.value)} required />
                   {renderErrorMessage("email_id")}
              </div>    
              <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                  {renderErrorMessage("pass")}
              </div>
              <div className="button-container">
                <button type="submit" className='button' onClick={()=>handleSubmit}>Sign Up</button>
              </div>
              <div className='register-link'>
                  <p>Don't have an account? <a href='Registration' className='link'>Register</a></p>
              </div>
            </form>
         </div>     
      </div>   
      )
    
}

export default Registration

*/}