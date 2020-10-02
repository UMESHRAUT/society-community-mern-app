import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Component } from 'react'
import {FaAlignRight, FaBuilding} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import { useSelector } from 'react-redux'
// import Profile from '../../private-components/homePage/sidebar/Sidebar'
import { Avatar } from '@material-ui/core'


export default function NavBar(){
    
    const [isOpen,setIsOpen]=useState(false)

    const memberDetails = useSelector(state => state.memberDetails)
    const{loding,responce,error}=memberDetails;
    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin
    const userDetails=JSON.parse(memberInfo)
    const [location, setLocation] = useState(window.location.pathname)
    useEffect(() => {
        setLocation(window.location.pathname)
        return () => {
            // cleanup
        }
    }, [])
    const handleToggle=()=>{
        setIsOpen(!isOpen);
    }

    return memberInfo?
    <nav className="navbar">
            {userDetails?.member?.role=='Admin'?
                <div className="nav-bar2">
                <div className="nav-header2">
                    <div>
                    <Link to="/home"> <h1 className="brandName"> <FaBuilding/> SOCIETY</h1><h5>.Network</h5></Link>
                    </div>
                    <div>
                <ul className="nav-links2">       
                <li>
                    <Link to="/signin" onClick={()=>{localStorage.removeItem("memberInfo");window.location.href="/"}}>logout</Link>
                </li>
                </ul>
                </div>
                </div>
                </div>
            :
                <div className="nav-bar">
                <div className="nav-header">
            <Link to="/home"> <h1 className="brandName"> <FaBuilding/> SOCIETY</h1><h5>.Network</h5></Link>
            <button type="button" className="nav-btn" onClick={handleToggle}>
            {!isOpen?<FaAlignRight className="nav-icon" />:<AiOutlineClose className="nav-icon" />} 
            </button>
            
            </div>
            {userDetails?.member?.role=='Admin'?
            <ul className={isOpen?"nav-links show-nav":"nav-links"}>       
            <li>
                <Link to="/signin" onClick={()=>{localStorage.removeItem("memberInfo");window.location.href="/"}}>logout</Link>
            </li>
            </ul>
            :
            <ul className={isOpen?"nav-links show-nav":"nav-links"} onClick={()=>setIsOpen(false)}>
            <li >
            <NavLink to="/home" activeClassName="active" className="nav-links2" >Home</NavLink>
            </li>    
            <li>   
            <NavLink to="/members" activeClassName="active" className="nav-links2">members</NavLink>
            </li>    
            <li>
            <NavLink to="/complaints" activeClassName="active" className="nav-links2" >complaints</NavLink>
            </li>    
            <li>
                <NavLink to="/rules" activeClassName="active" className="nav-links2">Rules</NavLink>
            </li>             
            <li>
                <NavLink to={`/profile/${userDetails?.member?.id}`} activeClassName="active" className="nav-links2"><Avatar className="avatar" src={userDetails.member.profile}/></NavLink>
            </li>       
            <li>
                <Link to="/signin" className={location=="/signin"? "active":""} onClick={()=>{setLocation("/signin");localStorage.removeItem("memberInfo");window.location.href="/"}}>logout</Link>
            </li> 
            </ul>}
            </div>}
        </nav>
    :(
        <nav className="navbar">
        <div className="nav-bar2">
            <div className="nav-header">
            <Link to="/" onClick={()=>setIsOpen(false)}> <h1 className="brandName"> <FaBuilding/> SOCIETY</h1><h5>.Network</h5></Link>
            </div> 
            <ul className="nav-links2">
            <li>
            <Link to="/signin" onClick={()=>{setLocation("/home")}} >Signin</Link>
            </li>
            {/* <li><div className="getStart">
            <Link to="/register">Get Started</Link></div>
            </li> */}
            <li> 
            <Link to="/AdminSignin"  onClick={()=>{setLocation("/AdminHome")}}> Admin</Link>
            </li>
            </ul>
        </div>
        </nav>
    )
}



