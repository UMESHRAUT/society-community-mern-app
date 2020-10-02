import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import { IoMdPersonAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { RegisterMember } from '../../../redux/actions/memberActions';
import { viewSocieties } from '../../../redux/actions/societyActions';
export default function Register(props) {
    Cookies.remove('message');
    const [details,setDetails]=useState({
        name:"",
        society:"",
        role:"Member",
        room_no:"",
        email:"",
        password:"",
        C_password:""
    })
    const [err,setErr]=useState(false);
    const memberRegister = useSelector(state => state.memberRegister)
    const{responce,loading,error}=memberRegister;

    const listSociety = useSelector(state => state.listSociety)
    const{loading:liadingSociety,societies,error:societyListErr}=listSociety;

    console.log(societies);


    const dispatch = useDispatch();

    useEffect(() => {

        setErr(false)
        dispatch(viewSocieties())
        return () => {
            // 
        }
    }, [])


    function handleChange(event){
        const {name,value}=event.target;

        setDetails(prev=>{
            return {...prev,[name]:value}
        })
    }
    

    function submit(e){
        e.preventDefault();
        if(details.name!="" && details.society!="" && details.room_no!="" && details.email!="" && details.password!="" && details.C_password){
        dispatch(RegisterMember(details.name,details.society,details.role,details.room_no,details.email,details.password,details.C_password))
        }else{
            setErr(true);
        }
    }

    return (
        <div className="signin">
        <form className="signin-form" onSubmit={submit}>
        <h1><IoMdPersonAdd/> Register Member</h1>
        
            {loading && <h2>loading...</h2>}
            {error && <h2 className="show-err" >{error}</h2>}
            
            {err && <h2 className="show-err">All fields are compulsary</h2>}
            {responce?.message && <h3 className="top-msg">{responce?.message}</h3>}
            {responce && <h2>OR</h2>}
            {responce?.link && <a href={responce?.link} className="top-msg" target="_blank">Click hear to activate now</a>}
            <label>Name</label>
            <input type="text" name="name" value={details.name} onChange={handleChange}/>

            <select className="societyList" name="society" onChange={handleChange} placeholder="select">
                <option className="select"value="Select your society">Select your society</option>
                {
                    societies==undefined?<option value='undefined'>Loading..</option>:
                   societies?.map(society=>{
                   return <option key={society._id} className="select-one" value={society._id} name="society" onClick={handleChange}>{society.name}</option>
                   })
               } 
            </select>
            <label>Room No</label>
            <input type="text" name="room_no" value={details.room_no} onChange={handleChange}/>  
            <label>Email</label>
            <input type="text" name="email" value={details.email} onChange={handleChange}/>       
            <label>password</label>
            <input type="password" name="password" value={details.password} onChange={handleChange}/> 
            <label>Confirm Password</label>
            <input type="password" name="C_password" value={details.C_password} onChange={handleChange}/>    
             <Link to="/" >
            <button className="btn primary" onClick={submit} value="submit">Register</button></Link>
            <label>Alredy have an account?  <Link to="/signin" ><span className="color_black    ">Log in</span></Link></label>
        </form>
        </div>
    )
}
