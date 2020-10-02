import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegEdit } from 'react-icons/fa';
import "./profile.css"
import { getMemberDetails } from '../../../../redux/actions/memberActions';
import Axios from 'axios';
import { Avatar } from '@material-ui/core';
function MemberProfile({match}) {
        const memberLogin = useSelector(state => state.memberLogin)
        const {memberInfo}=memberLogin;
        const member=JSON.parse(memberInfo);
        const memberDetails = useSelector(state => state.memberDetails)
        const{loading,responce,error}=memberDetails






        const[res,setRes]=useState();




        const dispatch = useDispatch();
        useEffect(() => {
            
            dispatch(getMemberDetails(match.params.id))
            return () => {
                // cleanup
            }
        }, [match.params])

        const[image,setImage]=useState("");

        const uploadImage=()=>{
            const data=new FormData();
            data.append("file",image)
            data.append("upload_preset","society")
            data.append("cloud_name","dbzfw4f78")
            fetch("	https://api.cloudinary.com/v1_1/dbzfw4f78/image/upload",{
                method:"post",
                body:data
            })
            .then(data=>data.json())
            .then(data=>{
                // console.log(data.secure_url);
                Axios.patch(`/api/user/${responce._id}`,{profile:data.secure_url}).then(res=>res.data.message=="Saved"?dispatch(getMemberDetails(match.params.id)):alert("error")).then((mem)=>{member.profile=responce; localStorage.setItem("memberInfo",JSON.stringify(member)); setImage("")})
            })
            .catch(err=>console.log(err))
        }

        const[err,setErr]=useState(false);

        const[password,setPassword]=useState({
            password:"",
            confirmPassword:""
        })

        const handlePassChange=(e)=>{
            const{name,value}=e.target;
            setPassword(prev=>{
                return {...prev,[name]:value}
            })
        }


        const handlePassSubmit=(e)=>{
            e.preventDefault()
            if(password.password != password.confirmPassword){
                setErr(true)
            }
            else{
                
            }
        }

        const[details,setDetails]=useState({name:responce?.name,password:"",confirmPassword:""})

        const[edit,setEdit]=useState(false);
        console.log(responce);
        const submitChange=(e)=>{
            e.preventDefault();
            Axios.patch(`/api/user/${responce._id}`,{name:details.name}).then(res=>res.data.message=="Saved"?dispatch(getMemberDetails(match.params.id)):alert("error")).then((mem)=>{ member.member=responce; localStorage.setItem("memberInfo",JSON.stringify(member)); setEdit(false)})
        }
        const handleChange=(e)=>{
            const{name,value}=e.target;
            setDetails(prev=>{
                return {...prev,[name]:value}
            })
        }
        return (
            loading?<div className="load-center"> <div className="loader"/></div>:
            <div className="center">
                
                <div className="societyName">{member?.member?.society?.name}</div>
                <div className="profile_container">
                <div className="profile_main">
                    <img src={responce?.profile ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="profile_img" alert={details.name}/>
                    {member?.member?.id==responce?._id &&image==""&&<input type="file" id="file" onChange={(e)=>{setRes(e.target.result);console.log(e.target.value); setImage(e.target.files[0])} } className="chose_btn"/>}
                    <div>
                    {image!==""&&<button onClick={uploadImage}>uplad</button>}
                    {image!==""&&<button onClick={()=>setImage("")}>cancle</button>}
                    </div>
                </div>
                <div className="user">
                {member?.member?.id==responce?._id && edit?<form onSubmit={submitChange}>
                    <input type="text" placeholder="name" name="name" value={details.name} onChange={handleChange} required/>
                    <button type="submit" className="save" >Save Changes</button>
                    </form>:
                <h1 className="forEdit">{responce?.name} {member.member.id==responce?._id &&<FaRegEdit className="EditMode" onClick={()=>setEdit(true)}/>}</h1>
                }
                <h2 className="role">{responce?.role}</h2>
                <div className="address">
                    <h3>Room No:{responce?.room_no+", "}</h3>
                    <h3>Society Address:{" "+responce?.society?.address+", "} Registration No:{" "+responce?.society?.reg_no}</h3>
                    </div>
                </div>
                </div>
                {member?.member?.id==responce?._id && <form className="password_form" onSubmit={handlePassSubmit}>
                    <h3>Change Password</h3>
                    <input type="password" placeholder="password" value={password.password} name="password" onChange={handlePassChange} className="password"/>
                    <input type="password" placeholder="confirm password" value={password.confirmPassword} name="confirmPassword" onChange={handlePassChange} className="password"/>
                    {password.password!="" && password.confirmPassword!="" &&<button type="submit" className="btn" onClick={handlePassSubmit}>Save Changes</button>}
                </form>}
            </div>
    )
}

export default MemberProfile
