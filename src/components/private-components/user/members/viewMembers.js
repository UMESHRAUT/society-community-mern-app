import React, { useEffect, useState } from 'react'
import { GetAllMember } from '../../../../redux/actions/memberActions'
import { useSelector, useDispatch } from 'react-redux';
import { json } from 'body-parser';
import { Link } from 'react-router-dom';

export default function ViewMembers() {
    const listMembers = useSelector(state => state.listMembers)
    const{loading,membersList,error}=listMembers
    // const data=JSON.parse(membersList)

    const[show,setShow]=useState(false);
    const[show_details,setShowDetails]=useState(false);

    const memberLogin = useSelector(state => state.memberLogin)
    const {loading:memberLoading,error:memberError,memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo);
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(memberDetails.member.society._id);
        dispatch(GetAllMember(memberDetails.member.society._id,memberDetails.token))
        return () => {
            // cleanup
        }
    }, [])


    return (
        <div>
            {/* <div className="profile-container-full">
            <div className="main-container1">
                <div className="member">
                    <div ><img className="profile" src="https://avixa.azureedge.net/portal/images/default-source/icons/just-for-you-icon.png?sfvrsn=3c0f0e5b_2" alt="member"/></div>
                    <div className="personal">
                        <h1>{memberDetails.member.name}</h1>
                        <h2>Society: {memberDetails.member.society.name}</h2>
                        <h3>Room No.: {memberDetails.member.room_no}</h3>
                    </div>
                </div>
            </div>
            <div className="role">
                <h1>Role In Society: {memberDetails.member.role}</h1>
                </div>
            </div> */}
            <div className="members-heading"><h1>members in {memberDetails.member.society.name}</h1></div>
            
            {loading && <div className="load-center"><div className="loader"/></div>}
            {membersList?.map(member=>{
                if(member._id!==memberDetails.member.id){
                return(<Link to={`/profile/${member._id}`} className="members" key={member._id} onClick={()=>{setShow(true)}}>
                    <div>
                    <h1>{member.name}</h1>
                    </div>
                    {
                    <div className="details" >
                        <div >
                    <h2 className="roomNo">Room no: {member.room_no}</h2>
                    <h3>mail: {member.email}</h3>
                    </div>
                    <h1>{member.role}</h1>
                </div>}
                    </Link>)}
            })}
        </div>
    )
}
