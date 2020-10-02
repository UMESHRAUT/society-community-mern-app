import React, { useEffect, useState } from 'react'
import Card from './Card'
import './service.css'
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import Axios from 'axios';




function Service() {

    const memberDetail = useSelector(state => state.memberDetails)
    const{responce}=memberDetail;

    const[service,setService]=useState({
        type:"",
        name:"",
        phone:"",
        email:"",
        imgURL:"",
        posted_by:responce?._id,
        society:responce?.society?._id
    })

    const[search,setSearch]=useState("");

    const[add,setAdd]=useState(false);

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setService(prev=>{
            return {...prev,[name]:value}
        })
    }






    const[image,setImage]=useState("");

    const uploadImage=(e)=>{
        e.preventDefault();
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
            console.log(data.secure_url);
            setService(prev=>{
                return {...prev,imgURL:data.secure_url}
            })
        })
        .then(()=>setImage(""))
        .catch(err=>console.log(err))
    }

    const [contacts,setContact]=useState([])
    useEffect(() => {
        fetch(`/api/user/service/${responce?.society._id}`).then(resp=>resp.json()).then(data=>setContact(data))
        return () => {
            // cleanup
        }
    }, [])
    const addServer=(e)=>{
        e.preventDefault()
        setContact(prev=>{
            return [...prev,service]
        })

        Axios.post(`/api/user/service`,{service})
        .then(res=>res.Status=="sucess"&& setContact(prev=>{
            return [...prev,res.d]
        }) ).then(l=>setAdd(false))
        .catch(err=>console.log(err))
    }

    return (
        <div className="service">
            <div className="header__input">
                <SearchIcon/>
                <input placeholder="Search Services" onChange={(e)=>setSearch(e.target.value)} value={search} type="text"/>
            </div>
            {!add?<button className="addNewNotice" type="button" onClick={()=>setAdd(true)}>Add Service</button>:

            <form onSubmit={addServer} className="form_container">
                <label>service type</label>
                <input placeholder="londry" onChange={handleChange} name="type" value={service.service} />

                <label>name</label>
                <input placeholder="londry"  onChange={handleChange} name="name" value={service.name} />


                <label>mobile no:</label>
                <input placeholder="londry"  onChange={handleChange} name="phone" value={service.tel}/>

                <label>email</label>
                <input placeholder="londry"  onChange={handleChange} name="email" value={service.email}/>

                <label>image</label>
                <div className="profile_main">
                    <img src={service.imgURL ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="profile_img" alert={service.name}/>
                    {image==""&&<input type="file" id="file" onChange={(e)=>{setImage(e.target.files[0])} } className="chose_btn"/>}
                    <div className="choice">
                    {image!==""&&<button onClick={uploadImage} className="btn">uplad</button>}
                    {image!==""&&<button onClick={()=>setImage("")} className="btn">cancle</button>}
                    </div>
                </div>
                <div className="choice">
                <button type="submit" onSubmit={addServer} className="btn">add</button>
                <button type="button" onClick={()=>setAdd(false)} className="btn">cancle</button>
                </div>
            </form>}
            <div className="services">
            {contacts?.filter(server=>server.name.includes(search)).map(contact=><Card
		                        key={contact._id}
		                        name={contact.name}
		                        image={contact.imgURL}
		                        tel={contact.phone}
                                email={contact.email}
                                service={contact?.type}
                                posted_by={contact?.posted_by}
                                posted_at={contact?.posted_at}
		                        />)}
            </div>

            
        </div>
    )
}

export default Service
