import moment from 'moment';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import '../Pages/Familydetail.css';
import Sidebar from '../Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { addUser, deleteUser, editUser } from './Users';

const Familydetail = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.value);
  
    /*const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState();
    const [relation, setRelation] = useState("");*/
  
    const [formData, setFormData] = useState({
      id: null,
      firstName: '',
      lastName: '',
      gender: '',
      birthday: '',
      relation: '',
    });
  
    const relations=[ "Father", "Mother", "Brother", "Sister","Friend"];
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (formData.id !== null) {
        dispatch(editUser({ id: formData.id, newData: formData }));
        toast.success("Changes Saved Successfully!");
        setFormData({
          id: null,
          firstName: '',
          lastName: '',
          gender: '',
          birthday: '',
          relation: '',
        });
      } 
      else if (users.length < 6) { // Changed to allow 12 members
        dispatch(addUser({ ...formData, id: Date.now() })); // Generate unique ID
        toast.success("Added Successfully!");
        setFormData({
          id: null,
          firstName: '',
          lastName: '',
          gender: '',
          birthday: '',
          relation: '',
        });
      } 
      else {
        toast.error("You have reached your maximum limit to Add Member");
      }
    };
  
    const handleDelete = (id) => {
      Swal.fire({
        title: 'Are You Sure?',
        text: 'You want to delete this Record!',
        icon: 'warning',
        showCancelButton: true,
        showSuccessOkButton:false,
        confirmButtonText: 'Yes,delete it!',
        cancelButtonText: 'No,cancel!',
        confirmButtonColor: '#29c2a6',
        cancelButtonColor: '#ee8686',
      }).then((result) => {
        if(result.isConfirmed){
          dispatch(deleteUser(id));
          toast.success("Deleted Successfully!")   
        }
      });  
    }
  
    const handleEdit = (user) => {
      setFormData(user);
    };
  
    const customToastStyle = {
      fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      fontSize: '16px',
      fontWeight: 'bold',
      position: 'top right',
    };
  
  return (
    <Sidebar>
    <div className='main'>
    <div className='containerf'>
    <form onSubmit={handleSubmit}>
      <h2>Family Details</h2>

      <div className="form-groupf">
              <label>Relation:</label>
              <select 
                value={formData.relation}
                className='relation'
                onChange={(e) => {setFormData({ ...formData, relation: e.target.value })}}
                placeholder='Relation'
              >
                {relations.map((code) => (
                <option key={code} value={code} defaultChecked={relations.indexOf(1)}>
                  {code}
                </option>
              ))}
              </select>
            </div>
            <div className='form-groupf'>
              <label>First Name:</label>
              <input 
              type="text" 
              value={formData.firstName}
              placeholder='First Name'
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required 
              />
            </div>
            <div className='form-groupf'>
              <label>Last Name:</label>
              <input
              type='text'
              value={formData.lastName}
              placeholder='Last Name'
              onChange={(e)=>setFormData({ ...formData, lastName: e.target.value })}
              required
              />
            </div>
            <div className='form-groupf'>
              <label>Gender:</label>
              <div className="radio-groupf">
                <input
                  type="radio"
                  value="male"
                  checked={formData.gender === "male" }
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                />
                <label>Male</label>
                <input
                  type="radio"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                />
                <label>Female</label>
              </div>
            </div>
            
            <div className="form-groupf">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={formData.birthday}
                max={moment(Date()).format("YYYY-MM-DD")}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                required
              />
            </div>
            <div className='btn-submit'>
                <button type="submit" className='button'>{formData.id ? 'Save Changes' : 'Add Family Member'}</button>
            </div>
            
    </form>
    </div>
    </div>
      <div className='disp'>          
        {users.map(user => (
            <div className='display' key={user.id}>
                <h2>{user.relation}</h2>
                <p>Name : {user.firstName} {user.lastName}</p>
                <p>Gender : {user.gender}</p>
                <p>Date of Birth : {user.birthday}</p>
                <button className='btn-edit' onClick={() => handleEdit(user)}><FaRegEdit/></button>
                <button className='btn-delete' onClick={() => handleDelete(user.id)}><MdDelete/></button>
            </div>
          ))}
      </div>
      <Toaster toastOptions={{style: customToastStyle,duration:1500,}} position="bottom-center" reverseOrder={false} />
  </Sidebar>
  );
};

export default Familydetail
