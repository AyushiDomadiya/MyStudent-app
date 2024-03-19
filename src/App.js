import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import AddPersonal from './Components/Pages/AddPersonal';
import Familydetail from './Components/Pages/Familydetail';
import Home from './Components/Pages/Home';
import Personaldetail from './Components/Pages/Personaldetail';
import Sidebar from './Components/Sidebar';
import Fetchdata from './Components/API/Fetchdata';
import Registration from './Components/Login/Registration';
import ForgotPassword from './Components/Login/ForgotPassword';

function App() {
  return (
    <div className='main-class'>
      <Router>
        <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/Registration' component={Registration}/>
            <Route path='/ForgotPassword' component={ForgotPassword}/>
            <Route path='/Sidebar' component={Sidebar}/>
            <Route path='/Home' component={Home}/>
            <Route path='/Personaldetail' component={Personaldetail}/>
            <Route path='/Familydetail' component={Familydetail}/>
            <Route path='/AddPersonal' component={AddPersonal}/>
            <Route path='/Fetchdata' component={Fetchdata}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
