// import { CREATE_POST_FAILURE, CREATE_POST_SUCCESS,CREATE_REEL_REQUEST,CREATE_REEL_FAILURE,CREATE_REEL_SUCCESS, CREATE_POST_REQUEST, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE, GET_ALL_REEL_REQUEST, GET_ALL_REEL_SUCCESS, GET_ALL_REEL_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_REEL_REQUEST, DELETE_REEL_SUCCESS, DELETE_REEL_FAILURE } from "./Post.actionType"
// import { api } from "../../config/api"

// export const createPostAction=(postData)=>async (dispatch)=>{
//     dispatch({type:CREATE_POST_REQUEST})
//     try {
//         const {data} = await api.post('/api/post',postData)
//         dispatch({type:CREATE_POST_SUCCESS,payload:data})
//         console.log("created post",data)
//     } catch (error) {
//         console.log("error")
//         dispatch({type:CREATE_POST_FAILURE,payload:error})
//     }
// };

// export const getAllPostAction = () => async (dispatch) => {
//     dispatch({ type: GET_ALL_POST_REQUEST });

//     try {
//         const res = await api.get('/api/posts');

//         console.log("API RESPONSE:", res.data); 

//         dispatch({
//             type: GET_ALL_POST_SUCCESS,
//             payload: res.data.content || res.data.data || res.data
//         });

//     } catch (error) {
//         dispatch({
//             type: GET_ALL_POST_FAILURE,
//             payload: error
//         });
//     }
// };

// export const getUsersPostAction=(userId)=>async (dispatch)=>{
//     dispatch({type:GET_USERS_POST_REQUEST})
//     try {
//         const {data} = await api.get(`/api/posts/user/${userId}`)
//         dispatch({type:GET_USERS_POST_SUCCESS,payload:data})
//         console.log("Get users post",data)
//     } catch (error) {
//         console.log("error")
//         dispatch({type:GET_USERS_POST_FAILURE,payload:error})
//     }
// }

// export const likePostAction=(postId)=>async (dispatch)=>{
//     dispatch({type:LIKE_POST_REQUEST})
//     try {
//         const {data} = await api.put(`/api/post/like/${postId}`)
//         dispatch({type:LIKE_POST_SUCCESS,payload:data})
//         // console.log("like post",data)
//     } catch (error) {
//         // console.log("error")
//         dispatch({type:LIKE_POST_FAILURE,payload:error})
//     }
// }

// //create comment
// export const createCommentAction=(reqData)=>async (dispatch)=>{
//     dispatch({type:CREATE_COMMENT_REQUEST})
//     try {
//         const {data} = await api.post(`/api/comment/post/${reqData.postId}`,reqData.data
//         )
//         dispatch({type:CREATE_COMMENT_SUCCESS,payload:data})
//         console.log("created comment",data)
//     } catch (error) {
//         // console.log("error")
//         // console.log("COMMENT ERROR 👉", error.response?.status, error.response?.data);
//         dispatch({type:CREATE_COMMENT_FAILURE,payload:error})
//     }
// };

// //delete comment
// export const deleteCommentAction = (commentId) => async (dispatch) => {
//     dispatch({ type: DELETE_COMMENT_REQUEST });

//     try {
//         const { data } = await api.delete(`/api/comment/delete/${commentId}`);
        
//         dispatch({
//             type: DELETE_COMMENT_SUCCESS,
//             payload: commentId   
//         });

//         // console.log("deleted comment", data);
//     } catch (error) {
//         // console.log("error", error);
//         dispatch({
//             type: DELETE_COMMENT_FAILURE,
//             payload: error
//         });
//     }
// };

// export const createReelAction=(reelData)=>async (dispatch)=>{
//     dispatch({type:CREATE_REEL_REQUEST})
//     try {
//         const {data} = await api.post(`/api/reels`,reelData
//         )
//         dispatch({type:CREATE_REEL_SUCCESS,payload:data})
//         console.log("created REEL",data)
//     } catch (error) {
//         // console.log("error")
        
//         dispatch({type:CREATE_REEL_FAILURE,payload:error})
//     }
// }

// export const getAllReelAction=()=>async (dispatch)=>{
//     dispatch({type:GET_ALL_REEL_REQUEST})
//     try {
//         const {data} = await api.get('/api/reels')
//         dispatch({type:GET_ALL_REEL_SUCCESS,payload:data})
//         console.log("Get all reel",data)
//     } catch (error) {
//         // console.log("error")
//         dispatch({type:GET_ALL_REEL_FAILURE,payload:error})
//     }
// }


// export const deletePostAction = (postId) => async (dispatch) => {
//     dispatch({ type: DELETE_POST_REQUEST });

//     try {
//         const { data } = await api.delete(`/api/post/${postId}`);
//         // console.log("deleted post",data)
//         dispatch({
//             type: DELETE_POST_SUCCESS,
//             payload: postId
//         });

//     } catch (error) {
//         // console.log("------", error);

//         dispatch({
//             type: DELETE_POST_FAILURE,
//             payload: error
//         });
//     }
// };

// export const removePostFromStore = (postId) => ({
//   type: "REMOVE_POST",
//   payload: postId
// });


// export const deleteReel = (reelId) => async (dispatch) => {
//   dispatch({ type: DELETE_REEL_REQUEST });

//   try {
    
//     const { data } = await api.delete(`/api/reel/${reelId}`);
  
//     dispatch({type: DELETE_REEL_SUCCESS,payload: reelId });

//   } catch (error) {
//     dispatch({
//       type: DELETE_REEL_FAILURE,
//       payload: error.message
//     });
//   }
// };

// export const removeReelFromStore = (reelId) => {
//   return {
//     type: "REMOVE_REEL",
//     payload: reelId
//   };
// };


import {
  CREATE_POST_FAILURE, CREATE_POST_SUCCESS, CREATE_REEL_REQUEST,
  CREATE_REEL_FAILURE, CREATE_REEL_SUCCESS, CREATE_POST_REQUEST,
  GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS,
  CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE,
  GET_ALL_REEL_REQUEST, GET_ALL_REEL_SUCCESS, GET_ALL_REEL_FAILURE,
  DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
  DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
  DELETE_REEL_REQUEST, DELETE_REEL_SUCCESS, DELETE_REEL_FAILURE
} from "./Post.actionType";

import { api } from "../../config/api";


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
   CREATE POST
========================= */
export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });

  try {
    const res = await api.post('/api/post', postData);

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: res.data
    });

  } catch (error) {
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};


/* =========================
   🔥 GET ALL POSTS (FIXED)
========================= */
export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });

  try {
    const res = await api.get('/api/posts');

    console.log("POST API:", res.data);

    dispatch({
      type: GET_ALL_POST_SUCCESS,
      payload: Array.isArray(res.data) ? res.data : []
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_POST_FAILURE,
      payload: error
    });
  }
};


/* =========================
   🔥 GET USER POSTS (FIXED)
========================= */
export const getUsersPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });

  try {
    const res = await api.get(`/api/posts/user/${userId}`);

    dispatch({
      type: GET_USERS_POST_SUCCESS,
      payload: extractArray(res.data)   // ✅ FIX
    });

  } catch (error) {
    dispatch({
      type: GET_USERS_POST_FAILURE,
      payload: error
    });
  }
};


/* =========================
   LIKE POST
========================= */
export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });

  try {
    const res = await api.put(`/api/post/like/${postId}`);

    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: res.data
    });

  } catch (error) {
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};


/* =========================
   CREATE COMMENT
========================= */
export const createCommentAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });

  try {
    const res = await api.post(
      `/api/comment/post/${reqData.postId}`,
      reqData.data
    );

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: res.data
    });

  } catch (error) {
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
  }
};


/* =========================
   DELETE COMMENT
========================= */
export const deleteCommentAction = (commentId) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT_REQUEST });

  try {
    await api.delete(`/api/comment/delete/${commentId}`);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: commentId
    });

  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      payload: error
    });
  }
};


/* =========================
   CREATE REEL
========================= */
export const createReelAction = (reelData) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });

  try {
    const res = await api.post(`/api/reels`, reelData);

    dispatch({
      type: CREATE_REEL_SUCCESS,
      payload: res.data
    });

  } catch (error) {
    dispatch({ type: CREATE_REEL_FAILURE, payload: error });
  }
};


/* =========================
   🔥 GET ALL REELS (FIXED)
========================= */
export const getAllReelAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_REEL_REQUEST });

  try {
    const res = await api.get('/api/reels');

    dispatch({
      type: GET_ALL_REEL_SUCCESS,
      payload: extractArray(res.data)   // ✅ FIX
    });

  } catch (error) {
    dispatch({
      type: GET_ALL_REEL_FAILURE,
      payload: error
    });
  }
};


/* =========================
   DELETE POST
========================= */
export const deletePostAction = (postId) => async (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });

  try {
    await api.delete(`/api/post/${postId}`);

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postId
    });

  } catch (error) {
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: error
    });
  }
};


/* =========================
   REMOVE POST (LOCAL)
========================= */
export const removePostFromStore = (postId) => ({
  type: "REMOVE_POST",
  payload: postId
});


/* =========================
   DELETE REEL
========================= */
export const deleteReel = (reelId) => async (dispatch) => {
  dispatch({ type: DELETE_REEL_REQUEST });

  try {
    await api.delete(`/api/reel/${reelId}`);

    dispatch({
      type: DELETE_REEL_SUCCESS,
      payload: reelId
    });

  } catch (error) {
    dispatch({
      type: DELETE_REEL_FAILURE,
      payload: error
    });
  }
};


/* =========================
   REMOVE REEL (LOCAL)
========================= */
export const removeReelFromStore = (reelId) => ({
  type: "REMOVE_REEL",
  payload: reelId
});

