// import { api, API_BASE_URL } from "../../config/api";
// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE, GET_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, GET_PROFILE_FAILURE ,UPDATE_PROFILE_REQUEST,GET_PROFILE_SUCCESS,UPDATE_PROFILE_FAILURE, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_REQUEST, DELETE_USER_REQUEST, DELETE_USER_FAILURE, DELETE_USER_SUCCESS} from "./auth.actionType"
// import axios from "axios";

// export const loginUserAction = (loginData)=>async(dispatch)=>{
//     dispatch({type:LOGIN_REQUEST})
//     try {
//         const {data}=await api.post("/auth/signin",loginData)
    
//         if(data.token){
//             localStorage.setItem("jwt",data.token)
            
//         }
//         // console.log("login success",data);
//         dispatch({type:LOGIN_SUCCESS,payload:data.token})
//         dispatch(getProfileAction());
     
//     } catch (error) {
//         // console.log("------",error)
//         dispatch({type:LOGIN_FAILURE,payload:error})
      
//     }
// }

// export const registerUserAction = (loginData) => async (dispatch) => {
//     dispatch({ type: REGISTER_REQUEST });

//     try {
//         const { data } = await axios.post(
//             `${API_BASE_URL}/auth/signup`,
//             loginData
//         );

//         if (data.token) {
//             localStorage.setItem("jwt", data.token);
//         }

//         // console.log("register", data);
//         dispatch({ type: REGISTER_SUCCESS, payload: data.token });

//     } catch (error) {
//         // console.log("------", error);
//         dispatch({ type: REGISTER_FAILURE, payload: error });
//     }
// }; 


// export const getProfileAction = () => async (dispatch) => {
//     dispatch({ type: GET_PROFILE_REQUEST });

//     try {
        
//         const { data } = await api.get("/api/users/profile");
        
//         //  console.log("profile", data);
//         dispatch({ type: GET_PROFILE_SUCCESS, payload: data });

//     } catch (error) {
//         // console.log("------", error);
//         dispatch({ type: GET_PROFILE_FAILURE, payload: error });
//     }
// };

// export const updateProfileAction = (reqData) => async (dispatch) => {
//   dispatch({ type: UPDATE_PROFILE_REQUEST });

//   try {
//     const { data } = await api.put(
//       `${API_BASE_URL}/api/user/update`,   
//       reqData
//     );

//     // console.log("Update profile", data);
//     dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });

//   } catch (error) {
//     // console.log("------", error);
//     dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
//   }
// };

// export const searchUser = (query) => async (dispatch) => {
//     dispatch({ type: SEARCH_USER_REQUEST });

//     try {
//         const { data } = await api.get(
//             `/api/users/search?query=${query}`);

//         console.log("search user", data);
//         dispatch({ type:SEARCH_USER_SUCCESS, payload: data });

//     } catch (error) {
//         // console.log("------", error);
//         dispatch({ type: SEARCH_USER_FAILURE, payload: error });
//     }
// };

// export const getAllUserAction = () => async (dispatch) => {
//     dispatch({ type: GET_ALL_USER_REQUEST });
    
//     try {
//         const {data} =  await api.get('/api/users')
//         // console.log("users", data);
        
//         dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });

//     } catch (error) {
//         // console.log("------", error);
//         dispatch({ type: GET_ALL_USER_FAILURE, payload: error });
//     }
// };

// export const followUserAction=(userId)=>async(dispatch)=>{
//     dispatch({type:FOLLOW_REQUEST});
//     try {
//         const {data} = await api.put(`/api/users/follow/${userId}`)
//         dispatch({type:FOLLOW_SUCCESS,payload:data})
//         // console.log(data)
//     } catch (error) {
//         // console.log(error)
//         dispatch({type:FOLLOW_FAILURE,payload:error})
//     }

// }
// export const savePostAction=(postId)=>async (dispatch)=>{
//     dispatch({type:SAVE_POST_REQUEST})
//     try {
//         const {data} = await api.put(`/api/posts/save/${postId}`)
//         dispatch({type:SAVE_POST_SUCCESS,payload:data})
//         // console.log(data)
//     } catch (error) {
//         // console.log(error)
//         dispatch({type:SAVE_POST_FAILURE,payload:error})
//     }
// }

// export const getUserById = (userId) => async (dispatch) => {
//     dispatch({ type: GET_USER_BY_ID_REQUEST });

//     try {
//         const { data } = await api.get(`/api/users/id/${userId}`);

//         // console.log("user profile by id", data);

//         dispatch({
//             type: GET_USER_BY_ID_SUCCESS,
//             payload: data
//         });

//     } catch (error) {
//         // console.log("------", error);

//         dispatch({
//             type: GET_USER_BY_ID_FAILURE,
//             payload: error
//         });
//     }
// };

// export const logoutAction = () => async (dispatch) => {
//     localStorage.removeItem("jwt");
//     dispatch({
//         type: "LOGOUT"
//     });
// };

// export const deleteUserAction = (userId) => async (dispatch) => {
//     dispatch({ type: DELETE_USER_REQUEST });

//     try {
//         const { data } = await api.delete(`/api/deleteuser/id/${userId}`);
//         // console.log("deleted  user",data)
//         dispatch({
//             type: DELETE_USER_SUCCESS,
//             payload: data
//         });

//     } catch (error) {
//         // console.log("------", error);

//         dispatch({
//             type: DELETE_USER_FAILURE,
//             payload: error
//         });
//     }
// };


import { api, API_BASE_URL } from "../../config/api";
import axios from "axios";

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
  SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE,
  GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE,
  GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAILURE,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from "./auth.actionType";


/* =========================
   🔥 COMMON HELPER (IMPORTANT)
========================= */
const extractArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};


/* =========================
   AUTH
========================= */

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await api.post("/auth/signin", loginData);

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    dispatch(getProfileAction());

  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};


export const registerUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      loginData
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    dispatch({ type: REGISTER_SUCCESS, payload: data.token });

  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};


/* =========================
   PROFILE
========================= */

export const getProfileAction = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const { data } = await api.get("/api/users/profile");

    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};


export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const { data } = await api.put(
      `${API_BASE_URL}/api/user/update`,
      reqData
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};


/* =========================
   🔥 SEARCH USER (FIXED)
========================= */

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });

  try {
    const res = await api.get(`/api/users/search?query=${query}`);

    console.log("SEARCH API:", res.data);

    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: extractArray(res.data)   // ✅ FIX
    });

  } catch (error) {
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};


/* =========================
   🔥 GET ALL USERS (FIXED)
========================= */

export const getAllUserAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST });

  try {
    const res = await api.get('/api/users');

    dispatch({
      type: GET_ALL_USER_SUCCESS,
      payload: extractArray(res.data)   // ✅ FIX
    });

  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAILURE, payload: error });
  }
};


/* =========================
   FOLLOW
========================= */

export const followUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_REQUEST });

  try {
    const { data } = await api.put(`/api/users/follow/${userId}`);

    dispatch({ type: FOLLOW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: FOLLOW_FAILURE, payload: error });
  }
};


/* =========================
   SAVE POST
========================= */

export const savePostAction = (postId) => async (dispatch) => {
  dispatch({ type: SAVE_POST_REQUEST });

  try {
    const { data } = await api.put(`/api/posts/save/${postId}`);

    dispatch({ type: SAVE_POST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: SAVE_POST_FAILURE, payload: error });
  }
};


/* =========================
   GET USER BY ID
========================= */

export const getUserById = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/users/id/${userId}`);

    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_USER_BY_ID_FAILURE,
      payload: error
    });
  }
};


/* =========================
   DELETE USER
========================= */

export const deleteUserAction = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  try {
    const { data } = await api.delete(`/api/deleteuser/id/${userId}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error
    });
  }
};


/* =========================
   LOGOUT
========================= */

export const logoutAction = () => async (dispatch) => {
  localStorage.removeItem("jwt");

  dispatch({
    type: "LOGOUT"
  });
};
