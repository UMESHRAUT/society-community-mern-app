import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getMemberDetails } from '../../../redux/actions/memberActions';



export default function Signin(props) {

    const memberLogin = useSelector(state => state.memberLogin)
    const {memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo);
    // const dispatch = useDispatch()
    const [err,setErr]=useState(false)
    const dispatch = useDispatch();
    const[load,setLoading]=useState(false);   
    useEffect(() => {
        if(memberInfo){
            console.log("log hear");
            console.log(memberInfo);
            window.location.href="/home";
        }
        return () => {
            // 
        }
    }, [])


    const [details,setDetails]=useState({
        email:"",
        password:"",
        role:"user"
    })
    
    function handleChange(event){
        const {name,value}=event.target;

        setDetails(prev=>{
            return {...prev,[name]:value}
        })
    }

    const submit=(event)=>{
        event.preventDefault();
        // dispatch(Login(details.email,details.password))
        setErr(false)
        setLoading(true);
        fetch("/api/user/login",
        {method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:details.email,password:details.password})})
        .then(res=>res.json())
        .then(msg=>msg.error?setErr(msg.error):localStorage.setItem("memberInfo",JSON.stringify(msg)))
        .then(()=>setLoading(false)).then(()=>localStorage.getItem('memberInfo')&&(window.location="/"))
        .then(()=>dispatch(getMemberDetails(memberDetails?.member?._id)))
        
    }


    return <div className="signin" >
        <form className="signin-form" onSubmit={submit}>
            <h2>log in</h2>
            {load==true?<div className="top-msg">Loading...</div>:<></>}
            {err && <div className="show-err">{err}</div>}
            <label>Email</label>
            <input type="text" name="email" value={details.email} onChange={handleChange} required/> 
            <label>password</label>
            <input type="password" name="password" value={details.password} onChange={handleChange} required/> 
            <button className="btn primary" type="submit" onClick={submit}>Sign-in</button>
            <label>not registered into Society?</label>
            <Link to="/register" >
            <button className="btn">Register</button></Link>
            
        </form>
        </div>
    
}

