import React from 'react'
import { Link } from 'react-router-dom';
import './service.css'

function Card(props){
    console.log(props);
    return <div className="card">
    <div className="top">
        <h2 className="name">{props.name}</h2>
        <h2 className="tag">Service: {props.service}</h2>
        <img className="circle-img" src={props.image} alt="avatar_img" />
    </div>
   <div className="bottom">
        <h3 className="info">{props.tel}</h3>
       <h3 className="info">{props.email}</h3>
   </div>
  <Link to={`/profile/${props.posted_by._id}`}><h4 className="postedby">posted by:{props?.posted_by?.name} at:{props?.posted_at?.split("T")[0]}</h4></Link>
</div>
}

export default Card
