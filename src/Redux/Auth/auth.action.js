import { api, API_BASE_URL } from "../../config/api";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE, GET_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, GET_PROFILE_FAILURE ,UPDATE_PROFILE_REQUEST,GET_PROFILE_SUCCESS,UPDATE_PROFILE_FAILURE, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_REQUEST, DELETE_USER_REQUEST, DELETE_USER_FAILURE, DELETE_USER_SUCCESS} from "./auth.actionType"
import axios from "axios";

export const loginUserAction = (loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data}=await api.post("/auth/signin",loginData)
    
        if(data.token){
            localStorage.setItem("jwt",data.token)
            
        }
        console.log("login success",data);
        dispatch({type:LOGIN_SUCCESS,payload:data.token})
        dispatch(getProfileAction());
     
    } catch (error) {
        console.log("------",error)
        dispatch({type:LOGIN_FAILURE,payload:error})
      
    }
}

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

        console.log("register", data);
        dispatch({ type: REGISTER_SUCCESS, payload: data.token });

    } catch (error) {
        console.log("------", error);
        dispatch({ type: REGISTER_FAILURE, payload: error });
    }
}; 


export const getProfileAction = () => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });

    try {
        
        const { data } = await api.get("/api/users/profile");
        
         console.log("profile", data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });

    } catch (error) {
        console.log("------", error);
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

    console.log("Update profile", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });

  } catch (error) {
    console.log("------", error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};

export const searchUser = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST });

    try {
        const { data } = await api.get(
            `/api/users/search?query=${query}`);

        console.log("search user", data);
        dispatch({ type:SEARCH_USER_SUCCESS, payload: data });

    } catch (error) {
        console.log("------", error);
        dispatch({ type: SEARCH_USER_FAILURE, payload: error });
    }
};

export const getAllUserAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USER_REQUEST });
    
    try {
        const {data} =  await api.get('/api/users')
        console.log("users", data);
        
        dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });

    } catch (error) {
        console.log("------", error);
        dispatch({ type: GET_ALL_USER_FAILURE, payload: error });
    }
};

export const followUserAction=(userId)=>async(dispatch)=>{
    dispatch({type:FOLLOW_REQUEST});
    try {
        const {data} = await api.put(`/api/users/follow/${userId}`)
        dispatch({type:FOLLOW_SUCCESS,payload:data})
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({type:FOLLOW_FAILURE,payload:error})
    }

}
export const savePostAction=(postId)=>async (dispatch)=>{
    dispatch({type:SAVE_POST_REQUEST})
    try {
        const {data} = await api.put(`/api/posts/save/${postId}`)
        dispatch({type:SAVE_POST_SUCCESS,payload:data})
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({type:SAVE_POST_FAILURE,payload:error})
    }
}

export const getUserById = (userId) => async (dispatch) => {
    dispatch({ type: GET_USER_BY_ID_REQUEST });

    try {
        const { data } = await api.get(`/api/users/id/${userId}`);

        console.log("user profile by id", data);

        dispatch({
            type: GET_USER_BY_ID_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.log("------", error);

        dispatch({
            type: GET_USER_BY_ID_FAILURE,
            payload: error
        });
    }
};

export const logoutAction = () => async (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({
        type: "LOGOUT"
    });
};

export const deleteUserAction = (userId) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

    try {
        const { data } = await api.delete(`/api/deleteuser/id/${userId}`);
        console.log("deleted  user",data)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.log("------", error);

        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error
        });
    }
};