import { ADD_NOTICE_REQUEST, ADD_NOTICE_FAIL, ADD_NOTICE_SUCESS, GET_NOTICE_REQUEST, GET_NOTICE_FAIL, GET_NOTICE_SUCESS, EDIT_NOTICE_REQUEST, EDIT_NOTICE_FAIL, EDIT_NOTICE_SUCESS } from "../constants/noticeConstants"

export const addNotice=(subject,about,Society,token)=>dispatch=>{
    dispatch({type:ADD_NOTICE_REQUEST})

    fetch("/api/user/notice",
    {method:"post",
    headers:{"content-type":"application/json","x-auth-token":token},
    body:JSON.stringify({subject,about,Society})})
    .then(res=>res.json())
    .then(resp=>resp.error?dispatch({type:ADD_NOTICE_FAIL,payload:(resp.error)}):dispatch({type:ADD_NOTICE_SUCESS,payload:"Notice Added Sucessfully"}))
}

export const getNotice=(Society,token)=>dispatch=>{
    try {
        console.log(Society);
        dispatch({type:GET_NOTICE_REQUEST})
        fetch(`/api/user/notice/society/${Society}`,
        {headers:{"content-type":"application/json","x-auth-token":token},

    }).then(res=>res.json())
        .then(resp=>resp.error?dispatch({type:GET_NOTICE_FAIL,payload:(resp.error)}):dispatch({type:GET_NOTICE_SUCESS,payload:resp}))
        .catch(()=>console.log("get notice log"))
    } catch (error) {
        console.log(error);
    }

}

export const EditNoticeAction=(notice_id)=>dispatch=>{
    try {
        dispatch({type:EDIT_NOTICE_REQUEST})
        fetch(`/api/user/notice/${notice_id}`,
        {method:"get",
        headers:{"content-type":"application/json"},

    }).then(res=>res.json())
        .then(resp=>resp.error?dispatch({type:EDIT_NOTICE_FAIL,payload:(resp.error)}):dispatch({type:EDIT_NOTICE_SUCESS,payload:resp}))
        .catch(()=>console.log("get notice log"))
    } catch (error) {
        console.log(error);
    }

}