import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EditNoticeAction } from '../../../../../redux/actions/noticeActions';
import { Link } from 'react-router-dom';

function EditNotice({match}) {

    const memberLogin = useSelector(state => state.memberLogin)
    const{memberInfo}=memberLogin
    const userDetails=JSON.parse(memberInfo);

    const dispatch = useDispatch();
    const editNotice = useSelector(state => state.editNotice)
    const{loading,notice,error}=editNotice;
  
    const[Enotice,setNotice]=useState({
        subject:"",
        about:""
    });
    const [err,setErr]=useState(false);

    useEffect(() => {
        if(match.params.notice_id=="NewNotice"){
            console.log("this is new notice");
        }else{
        dispatch(EditNoticeAction(match.params.notice_id))
        }
        return () => {
            
        }
    }, []) 
    useEffect(() => {
        setNotice({
            subject:notice?.subject,
            about:notice?.about
        });
        return () => {
            // 
        }
    }, [loading]) 

    const SubmitNotice=(e)=>{
        fetch(`/api/user/notice/${e}`,
        {method:"post",
        headers:{"content-type":"application/json","x-auth-token":userDetails.token},
        body:JSON.stringify({Society:userDetails.member.society._id,subject:Enotice.subject,about:Enotice.about})}
        )
        .then(res=>res.json())
        .then(resp=>resp.status=="success"?window.location="/":resp.error?setErr(resp.error):"")
        .catch(error=>console.log(error))

    }

    const handleChange=(e)=>{
        const{name,value}=e.target

        setNotice(prev=>{
            return{...prev,[name]:value}
        })
    }


    return (
        <div className="notice-container">
            {err&&<div className="show-err">{err}</div>}
            {loading?<div className="load-center"><div className="loader"/></div>:
            <div className="notice">
                <h1 className="date"><span>Posted At : </span>{notice?.createdAt.split("T")[0]}</h1>
                <div className="content">
                    <h2 className="default">subject: </h2>
                    <input placeholder={notice?.subject} name="subject" value={Enotice.subject} onChange={handleChange}></input>
                </div>
                <div className="content">
                    <h2 className="default">Description: </h2>
                    <textarea placeholder={notice?.about} name="about" value={Enotice.about} onChange={handleChange}></textarea>
                </div>
                <div className="button">
                    <button className="addNotice" type="submit" onClick={()=>SubmitNotice(match.params.notice_id)}>Done</button>
                    <Link to="/"><button className="addNotice" type="submit">cancel</button></Link>
                </div>
            </div>}
        </div>
    )
}

export default EditNotice
