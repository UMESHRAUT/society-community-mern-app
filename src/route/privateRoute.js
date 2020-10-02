import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


export const PrivateRoute=({
    component:PrivateComponent,
    signedInRoute,
    ...routerProps
})=>{
    const memberLogin = useSelector(state => state.memberLogin);
    const {memberInfo}=memberLogin
    const memberDetails=JSON.parse(memberInfo);
    return(
        memberDetails?
        <Route {...routerProps} render={
            props=>(
                <PrivateComponent {...props}/>
            )
        }/>:<Redirect to="/signin"/>
    )
}