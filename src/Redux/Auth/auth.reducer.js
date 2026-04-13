import { LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, SEARCH_USER_SUCCESS, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_PROFILE_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS } from "./auth.actionType"

const initialState = {
    jwt:null,
    error:null,
    loading:false,
    user:null,
    profile: null,
    searchUser:[],
    users:[]
}
export const authReducer=(state=initialState,action)=>{
    switch(action.type){
        
        case SAVE_POST_REQUEST:
        case GET_USER_BY_ID_REQUEST:    
        case LOGIN_REQUEST:
        case DELETE_USER_REQUEST: 
        
            return {...state, loading:true,error:null}
        case REGISTER_REQUEST:
            return {...state, loading:true,error:null}    
        case "GET_USER_BY_ID_SUCCESS":
            return {
                ...state,
                loading: false,
                profile: action.payload
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users : state.users.filter((user)=>user.id !== action.payload.id)
            }
        
        case LOGIN_SUCCESS:
            return {...state, jwt:action.payload,loading:false, error:null}
        case REGISTER_SUCCESS:
            return {...state, jwt:action.payload,loading:false, error:null}        
        case LOGIN_FAILURE:
            return {...state,loading:false,error:action.payload}
        case REGISTER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case GET_PROFILE_SUCCESS:
            return {...state, user:action.payload, loading:false, error:null}
        case GET_PROFILE_REQUEST:
            return {...state, loading:true, error:null} 
        // case UPDATE_PROFILE_SUCCESS:
        //     return {...state, jwt:action.payload, loading:false,error:null}
        case UPDATE_PROFILE_SUCCESS:
            return {...state, user:action.payload, loading:false,error:null}
        case SEARCH_USER_SUCCESS:
            return {...state,searchUser:action.payload,loading:false,error:null}    
        case GET_ALL_USER_REQUEST:
            return {...state, loading:true, error:null} 
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                users: Array.isArray(action.payload) 
                    ? action.payload 
                    : action.payload?.data || [],
                loading: false,
                error: null
            };
    
        case GET_ALL_USER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case FOLLOW_REQUEST:
            return {...state,loading:true,error:null}
        case FOLLOW_SUCCESS:
            return {...state,user:action.payload,loading:false,error:null}
        case SAVE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload  
            };    
        case GET_PROFILE_FAILURE:
        case FOLLOW_FAILURE:
        case GET_USER_BY_ID_FAILURE:    
        case SAVE_POST_FAILURE:    
            return {...state,loading:false,error:action.payload}       
        case "LOGOUT":
            return {...state,jwt:null,user:null,loading:false,error:null}             
        default:
            return state;
    
    }
}