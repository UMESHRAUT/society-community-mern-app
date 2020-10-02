import React, { lazy, Suspense } from 'react';
import './App.css';
import Footer from './components/public-component/footer';
import Rules from './components/private-components/user/rules';
import Home from './components/private-components/home';
import NavBar from './components/public-component/navbar';
import Signin from './components/public-component/user/signin';
import Register from './components/public-component/user/register';
import Activate from './components/public-component/user/activate';
import { PublicRoute } from './route/publicRoute';
import { PrivateRoute } from './route/privateRoute';
import {Provider} from 'react-redux'
import store from './redux/store';
import ViewMembers from './components/private-components/user/members/viewMembers';
import Complaints from './components/private-components/user/complaints/complaints';
import ActivateAdmin from './components/public-component/user/adminActivate';
import AdminSignin from './components/private-components/admin/AdminSignin';
import AdminRegister from './components/private-components/admin/AdminRegister';
import AdminHome from './components/private-components/admin/components/AdminHome';

import SocietyRegister from './components/private-components/admin/components/createSociety';
import Societies from './components/private-components/admin/components/societies';
import Society from './components/private-components/admin/components/Society';
import { Switch } from 'react-router-dom';
import MemberProfile from './components/private-components/user/members/member_profile';
import services from './components/public-component/Home-sreen-public/services';
import EditNotice from './components/private-components/user/homePage/notice/editNotice';
import Service from './components/private-components/user/marketPlace/Service';
import AddNotice from './components/private-components/user/homePage/notice/addNotice';
import Profile from './components/private-components/user/homePage/sidebar/Sidebar';

const Main =lazy(()=> import('./components/public-component/main'));


function App() {
  return (<Suspense fallback={<div className="load-center"><div className="loader"></div></div>}>
  <Provider store={store}>
    <div className="App grid-container">
      <NavBar />
  
    {/* <Switch> */}
      
      <PrivateRoute component={SocietyRegister} exact={true} path="/societyRegister" />
      <PublicRoute component={AdminSignin} exact={true} path="/AdminSignin/" />
      <PublicRoute component={AdminRegister} exact={true} path="/AdminRegister"/>
      <PublicRoute component={ActivateAdmin} exact={true} path="/society/activateAdmin/:token"  />
      <PrivateRoute component={AdminHome} exact={true} path="/AdminHome" />
      <PrivateRoute component={Society} exact={true} path="/society/:id" />
      <PrivateRoute component={MemberProfile} exact={true} path="/profile/:id" />
      <PrivateRoute component={EditNotice} exact={true} path="/society/notice/Edit/:notice_id" />

      {/* user */}
      <PublicRoute component={Signin} exact={true} path="/signin/" />
      <PublicRoute component={Register} exact={true} path="/register" />
      <PublicRoute component={Activate} exact={true} path="/society/activate/:token"  />
      <PrivateRoute component={Home}  path="/home" />
      <PrivateRoute component={Rules} exact={true} path="/rules" />
      {/* <PrivateRoute component={Service} exact={true} path="/home/Service" /> */}
      <PrivateRoute component={ViewMembers} exact={true} path="/members" />
      <PrivateRoute component={Complaints} exact={true} path="/complaints"/>
      <PrivateRoute component={services} exact={true} path="/services"/>
      <PublicRoute component={Main} exact={true} path="/" />

      {/* </Switch> */}
      <Footer />
    </div>
    </Provider>
    </Suspense>

  );
}

export default App;
