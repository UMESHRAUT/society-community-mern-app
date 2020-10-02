import React from 'react'
import Profile from './sidebar/Sidebar'
import AddNotice from './notice/addNotice'
import { Route, Redirect } from "react-router-dom";
import { PrivateRoute } from '../../../../route/privateRoute';
import Service from '../marketPlace/Service';

export default function HomePage() {
    return (
        <div className="home-page">
            <Profile/>
            <PrivateRoute path="/home" exact={true} component={AddNotice} />
            <PrivateRoute  path="/home/pages" component={Profile} />
            <PrivateRoute  path="/home/friends" component={AddNotice} />
            <PrivateRoute  path="/home/messages" component={AddNotice} /> 
            <PrivateRoute  path="/home/services" component={Service} /> 
            {/* <Route exact="true" path="/home/" component={AddNotice} />  */}
            {/* <AddNotice/> */}
        </div>
    )
}
