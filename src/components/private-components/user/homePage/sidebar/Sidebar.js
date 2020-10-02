import React from 'react';
import "./Sidebar.css";
import PeopleIcon from '@material-ui/icons/People';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { useSelector } from 'react-redux';
import SideRow from './SideRow';
import { Link, NavLink} from 'react-router-dom'

export default function Profile() {

    const memberDetail = useSelector(state => state.memberDetails)
    const{responce}=memberDetail;
    const memberLogin = useSelector(state => state.memberLogin)
    const {loading,error,memberInfo}=memberLogin;
    const memberDetails=JSON.parse(memberInfo);
    console.log(memberDetails.member.id);
    return (
        <div className="profile-container">
        <div className="sidebar">
            <Link to={`/profile/${responce?._id}`}>
            <SideRow src={responce?.profile ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} name={responce?._id} title={responce?.name}/>
            </Link>
            
            <SideRow title="Pages" Icon={EmojiFlagsIcon}/>
            <SideRow title="Friends"  Icon={PeopleIcon}/>
            <SideRow title="Messages" Icon={ChatIcon}/>
            <SideRow title="Services" Icon={StorefrontIcon}/>
        </div>
            </div>
    )
}
