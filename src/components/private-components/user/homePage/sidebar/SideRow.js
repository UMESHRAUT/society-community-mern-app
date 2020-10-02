import React from 'react'
import "./Sidebar.css"
import { Avatar, Link } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
function SideRow({src,Icon,title,name}) {
    return (
        
        <NavLink to={ name?`/profile/${name}`:`/home/${title?.toLowerCase()}`} exact className="sidebarRow" activeClassName="active1">
            {src && <Avatar src={src}/>}
            {Icon && <Icon/>}
            <h4 className="page_name">{title}</h4>
        </NavLink>
    )
}

export default SideRow
