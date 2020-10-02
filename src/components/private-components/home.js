import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import HomePage from '../private-components/user/homePage/homePage';
import AdminHome from './admin/components/AdminHome';
import { getMemberDetails } from '../../redux/actions/memberActions';

export default function Home() {
    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMemberDetails(memberDetails.member.id))
        return () => {
            // cleanup
        }
    }, [])
    return (
        
           memberDetails?.member?.role==="Admin" ? <AdminHome />:memberDetails? <HomePage />:
           <Redirect to="/signin"/>
    )
}
