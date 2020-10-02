import React, { useState, useEffect } from 'react'
import { IoIosSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';import "./Notice.css"


function NoticeReply({NewNotice}) {

// console.log(NewNotice);

    const[msg,setMsg]=useState("");
    // const getNewNotice = useSelector(state => state.getNewNotice)
    const memberLogin = useSelector(state => state.memberLogin)
    const [messages,setMessages]=useState([{msg:"Send first responce."}]);
    const[msgLoad,setMsgLoad]=useState(false);
    const {memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo);
    const[seeComments,setComments]=useState(false)

    const[upvote,setUpvote]=useState(0);
    const[downvote,setDownvote]=useState(0);


    const[vote,setVote]=useState(false);


    useEffect(() => {
        // console.log(NewNotice.upvote);
        console.log(NewNotice.upvote.filter(id=>id==memberDetails.member.id).length);
        if(NewNotice.upvote.filter(id=>id==memberDetails.member.id).length>=1){
            setVote("upvote")
        }
        else if(NewNotice.downvote.filter(id=>id==memberDetails.member.id).length>=1){
            setVote("downvote")
        }

        setUpvote(NewNotice.upvote.length)
        setDownvote(NewNotice.downvote.length)
        // NewNotice.upvote.filter(id=>id==memberDetails.member.id).length>0
        // console.log(NewNotice.downvote.filter(id=>id==memberDetails.member.id))
        return () => {
            // cleanup
        }
    }, [])


    const send=(e)=>{
        // console.log(NewNotice._id+"----"+memberDetails.member.id+"--"+msg);
        if(msg!="" && NewNotice!="undefined"){
            setMsgLoad(true);
            setComments(true)
        e.preventDefault()
        fetch("/api/user/notice/message",
        {method:"post",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({Notice:NewNotice?._id,owner:memberDetails.member.id,msg:msg})
        }).then(data=>data.json()).then(log=>{console.log("ding");getreplyes()}).catch(err=>console.log(err))
        setMsg("");
        setMsgLoad(false);
    }

    }
    useEffect(() => {
        getreplyes();
        return () => {
            // 
        }
    }, [NewNotice])

    const getreplyes=()=>{
        if(NewNotice?._id!=undefined){
            fetch(`/api/user/notice/message/${NewNotice?._id}`,{method:"get",headers:{"content-type":"application/json"}})
            .then(data=>data.json())
            .then(messag=>{setMessages(messag);})
            .catch(()=>setMessages({msg:"default"}))


        }
    }


    const Upvote=()=>{
        console.log(NewNotice._id);
        fetch(`/api/user/notice/upvote?notice_id=${NewNotice?._id}&member_id=${memberDetails.member.id}`,{method:"put",headers:{"content-tyoe":"application/json"}})
            .then(data=>data.json())
            .then(votes=>{
                // const 
                console.log(votes);
                if(votes.vote.upvote.filter(id=>id==memberDetails.member.id).length>0){
                    setVote("upvote")
                }
                if(votes.vote.downvote.filter(id=>id==memberDetails.member.id).length>0){
                    setVote("downvote")
                }
                setUpvote(votes.vote.upvote.length)
                setDownvote(votes.vote.downvote.length)
            }) 
    }

    const Downvote=()=>{
        fetch(`/api/user/notice/downvote?notice_id=${NewNotice?._id}&member_id=${memberDetails.member.id}`,{method:"put",headers:{"content-tyoe":"application/json"}})
            .then(data=>data.json())
            .then(votes=>{
                console.log(votes);
                if(votes.vote.upvote.filter(id=>id==memberDetails.member.id).length>0){
                    setVote("upvote")
                }
                if(votes.vote.downvote.filter(id=>id==memberDetails.member.id).length>0){
                    setVote("downvote")
                }
                setUpvote(votes.vote.upvote.length)
                setDownvote(votes.vote.downvote.length)
            })
            
    }

    const handleChange=(e)=>{
        setMsg(e.target.value)
    }
    return (
        <div className="reply">
             <div className="post__options">
                <div className={`post__option ${vote=="upvote"&&"upvote"}`} onClick={Upvote}>
                    <ThumbUpAltIcon className={vote.upvote&&"tick"}/>
                    <p >Upvote {upvote}</p>
                </div>
                <div className={`post__option ${vote=="downvote"&&"downvote"}`} onClick={Downvote}>
                    <ThumbDownIcon className={vote.downvote&&"tick"}/>
                    <p >Downvote {downvote}</p>
                    </div>
                <div className="post__option" onClick={()=>setComments(!seeComments)}>
                    <ChatBubbleOutlineIcon/>
                    <p>Comments</p>
                    </div>
            </div>
            {seeComments&&
            <div className="notice__replyes">
            {msgLoad&&<div className="load-center"><div className="loader"></div></div>}
            {messages?.map((message,indx)=>{

                return <div key={indx} className={memberDetails.member.name!==message?.owner?.name ?"float_left":"float_right"}>
                        <div className="message" >
                    <div className={memberDetails.member.name==message?.owner?.name ?"mine":"others"}>
                        <Link to="/members"><h4 className="name">{message?.owner?.name}</h4></Link>
                        <h2 className="mineMessage">
                    {message.msg}
                    </h2>
                    </div>
                    </div>
                    </div>
            })}
            {seeComments&&<h3 className="messageVisible" onClick={()=>setComments(false)}>hide all messages</h3>}
             </div>}
            <form onSubmit={send}>
           <div className="send"> <input className="msg" placeholder="Say something..." onChange={handleChange} value={msg} /><button type="submit" onClick={send}><IoIosSend className="send-icon"/></button></div>
           </form>
        </div>
    )
}

export default NoticeReply
