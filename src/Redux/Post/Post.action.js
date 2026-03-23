import { CREATE_POST_FAILURE, CREATE_POST_SUCCESS,CREATE_REEL_REQUEST,CREATE_REEL_FAILURE,CREATE_REEL_SUCCESS, CREATE_POST_REQUEST, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE, GET_ALL_REEL_REQUEST, GET_ALL_REEL_SUCCESS, GET_ALL_REEL_FAILURE } from "./Post.actionType"
import { api } from "../../config/api"

export const createPostAction=(postData)=>async (dispatch)=>{
    dispatch({type:CREATE_POST_REQUEST})
    try {
        const {data} = await api.post('/api/post',postData)
        dispatch({type:CREATE_POST_SUCCESS,payload:data})
        console.log("created post",data)
    } catch (error) {
        console.log("error")
        dispatch({type:CREATE_POST_FAILURE,payload:error})
    }
};

export const getAllPostAction=()=>async (dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST})
    try {
        const {data} = await api.get('/api/posts')
        dispatch({type:GET_ALL_POST_SUCCESS,payload:data})
        console.log("Get all post",data)
    } catch (error) {
        console.log("error")
        dispatch({type:GET_ALL_POST_FAILURE,payload:error})
    }
}

export const getUsersPostAction=(userId)=>async (dispatch)=>{
    dispatch({type:GET_USERS_POST_REQUEST})
    try {
        const {data} = await api.get(`/api/posts/user/${userId}`)
        dispatch({type:GET_USERS_POST_SUCCESS,payload:data})
        console.log("Get users post",data)
    } catch (error) {
        console.log("error")
        dispatch({type:GET_USERS_POST_FAILURE,payload:error})
    }
}

export const likePostAction=(postId)=>async (dispatch)=>{
    dispatch({type:LIKE_POST_REQUEST})
    try {
        const {data} = await api.put(`/api/post/like/${postId}`)
        dispatch({type:LIKE_POST_SUCCESS,payload:data})
        console.log("like post",data)
    } catch (error) {
        console.log("error")
        dispatch({type:LIKE_POST_FAILURE,payload:error})
    }
}

//create comment
export const createCommentAction=(reqData)=>async (dispatch)=>{
    dispatch({type:CREATE_COMMENT_REQUEST})
    try {
        const {data} = await api.post(`/api/comment/post/${reqData.postId}`,reqData.data
        )
        dispatch({type:CREATE_COMMENT_SUCCESS,payload:data})
        console.log("created comment",data)
    } catch (error) {
        console.log("error")
        console.log("COMMENT ERROR 👉", error.response?.status, error.response?.data);
        dispatch({type:CREATE_COMMENT_FAILURE,payload:error})
    }
};

export const createReelAction=(reelData)=>async (dispatch)=>{
    dispatch({type:CREATE_REEL_REQUEST})
    try {
        const {data} = await api.post(`/api/reels`,reelData
        )
        dispatch({type:CREATE_REEL_SUCCESS,payload:data})
        console.log("created REEL",data)
    } catch (error) {
        console.log("error")
        
        dispatch({type:CREATE_REEL_FAILURE,payload:error})
    }
}

export const getAllReelAction=()=>async (dispatch)=>{
    dispatch({type:GET_ALL_REEL_REQUEST})
    try {
        const {data} = await api.get('/api/reels')
        dispatch({type:GET_ALL_REEL_SUCCESS,payload:data})
        console.log("Get all reel",data)
    } catch (error) {
        console.log("error")
        dispatch({type:GET_ALL_REEL_FAILURE,payload:error})
    }
}