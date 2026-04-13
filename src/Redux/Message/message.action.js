// import { api } from "../../config/api"
// import * as actionType from "./message.actionType"

// export const createMessage=(message)=>async(dispatch)=>{
//     dispatch({type:actionType.CREATE_MESSAGE_REQUEST})
//     try {
//         const {data} = await api.post(`/api/message/chat/${message.chatId}`,message);
        
//         // console.log("created msg",data)
//         // reqData.sendMessageToServer(data);
//         dispatch({type:actionType.CREATE_MESSAGE_SUCCESS,payload:data})
//     } catch (error) {
//         // console.log("error in message",error)
//         dispatch({type:actionType.CREATE_MESSAGE_FAILURE,payload:error})   
//     }
// }

// export const createChat=(chat)=>async(dispatch)=>{
//     dispatch({type:actionType.CREATE_CHAT_REQUEST})
//     try {
//         const {data} = await api.post(`/api/chats`,chat);
        
//         // console.log("created chat",data)
//         dispatch({type:actionType.CREATE_CHAT_SUCCESS,payload:data})
//     } catch (error) {
//         // console.log("error in message",error)
//         dispatch({type:actionType.CREATE_CHAT_FAILURE,payload:error})   
//     }
// }

// export const getAllChats=()=>async(dispatch)=>{
//     dispatch({type:actionType.GET_ALL_CHATS_REQUEST})
//     try {
//         const {data} = await api.get(`/api/chats`);
        
//         // console.log("get all chats",data)
//         dispatch({type:actionType.GET_ALL_CHATS_SUCCESS,payload:data})
//     } catch (error) {
//         // console.log("error in message",error)
//         dispatch({type:actionType.GET_ALL_CHATS_FAILURE,payload:error})   
//     }
// }

import { api } from "../../config/api"
import * as actionType from "./message.actionType"


/* =========================
   🔥 COMMON HELPER
========================= */
const extractArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};


/* =========================
   CREATE MESSAGE
========================= */
export const createMessage = (message) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });

    try {
        const res = await api.post(`/api/message/chat/${message.chatId}`, message);

        dispatch({
            type: actionType.CREATE_MESSAGE_SUCCESS,
            payload: res.data   // single object ✔️
        });

    } catch (error) {
        dispatch({
            type: actionType.CREATE_MESSAGE_FAILURE,
            payload: error
        });
    }
};


/* =========================
   CREATE CHAT
========================= */
export const createChat = (chat) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_CHAT_REQUEST });

    try {
        const res = await api.post(`/api/chats`, chat);

        dispatch({
            type: actionType.CREATE_CHAT_SUCCESS,
            payload: res.data   // single object ✔️
        });

    } catch (error) {
        dispatch({
            type: actionType.CREATE_CHAT_FAILURE,
            payload: error
        });
    }
};


/* =========================
   🔥 GET ALL CHATS (FIXED)
========================= */
export const getAllChats = () => async (dispatch) => {
    dispatch({ type: actionType.GET_ALL_CHATS_REQUEST });

    try {
        const res = await api.get(`/api/chats`);

        console.log("CHAT API:", res.data);

        dispatch({
            type: actionType.GET_ALL_CHATS_SUCCESS,
            payload: extractArray(res.data)   // ✅ FIX
        });

    } catch (error) {
        dispatch({
            type: actionType.GET_ALL_CHATS_FAILURE,
            payload: error
        });
    }
};

