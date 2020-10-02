import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNotice, getNotice } from '../../../../../redux/actions/noticeActions';
import NoticeReply from './noticeReply';
    
export default function AddNotice() {
    
    const memberLogin = useSelector(state => state.memberLogin)
    const{memberInfo}=memberLogin
    const userDetails=JSON.parse(memberInfo);

    const addNewNotice = useSelector(state => state.addNewNotice)
    const{loading,message,error}=addNewNotice;

    const [vote, setVote] = useState();

    const handleVote=(e)=>{
        setVote(e);
    }

    const[newNotice,setNewNotice]=useState(false);

    const getNewNotice = useSelector(state => state.getNewNotice)
    const {error:err,NewNotice:noticeList}=getNewNotice
    const noticeLoading=getNewNotice.loading

    const[quote,setQuote]=useState("");
    
    const dispatch = useDispatch();

    useEffect(() => {
    fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log();
            setQuote(data[Math.round(Math.random()*(1000-1+1)+1)].text);
        }).catch(()=>setQuote("Somethign is better than Nothing"));
        dispatch(getNotice(userDetails.member.society._id,userDetails.token));
        return () => {
            // cleanup
        }
    }, [AddNotice])


    const DeleteNotice=(e)=>{
        // e.preventDefault();
        console.log(e);
        fetch(`/api/user/notice/deleteNotice/${e}`,{method:'delete'}).then(()=>{
             dispatch(getNotice(userDetails.member.society._id,userDetails.token));

        })
    }

    
    // const submit=async (e)=>{
    //     // e.preventDefault()
    //     await dispatch(addNotice(notice.subject,notice.about,userDetails.member.society._id,userDetails.token))

    //     await dispatch(getNotice(userDetails.member.society._id,userDetails.token));
    //     setEdit(false);
    //     setNotice(false);
    //     console.log("logging");
    //     setEdit(false);
    //     await dispatch(getNotice(userDetails.member.society._id,userDetails.token));
        
    // }
    


    return(
        <div className="updates">
        <h1 className="quote">Thought of the    Day: "{quote}"</h1>
        {userDetails.member.role==="Secratory" &&
            <div className="button">
            <Link to={`/society/notice/Edit/NewNotice`}><button className="addNewNotice" type="button">Add Notice</button></Link>
            </div>}
        {noticeLoading&&<div className="load-center"><div className="loader"/></div>}
        {noticeList?.length>0?
        noticeList?.map(NewNotice=>{
       return (<div key={NewNotice._id}>
                <div className="notice-container">
                <div className="notice">
                    <h1 className="date"><span>Posted At : </span>{NewNotice?.createdAt.split("T")[0]}</h1>
                    <div className="content">
                        <h2 className="default">subject: </h2>
                        <h1><p>{NewNotice?.subject}</p></h1>    
                    </div>
                
                    <div className="content">
                        <h2 className="default">Description: </h2>
                        <h1><p>{NewNotice?.about}</p></h1>
                        </div>
                            {userDetails.member.role==="Secratory" &&
                                <div className="button">
                                <Link to={`/society/notice/Edit/${NewNotice._id}`}><button className="addNotice" type="button">Edit</button></Link>
                                <button className="addNotice" type="submit" onClick={()=>DeleteNotice(NewNotice._id)}>Delete</button>
                                </div>}
                        </div>

                        <NoticeReply NewNotice={NewNotice}/> 
                    </div>
                     
                </div>
                )})
                :<>
                {!noticeLoading && <div className="load-center"><h1>No Notice available to show!!.</h1></div>}</>
            }
    </div>
    )
}



