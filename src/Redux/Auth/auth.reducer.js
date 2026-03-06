import { LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"

const initialState = {
    jwt:null,
    error:null,
    loading:false,
    user:null
}
export const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return {...state, loading:true,error:null}
        case REGISTER_REQUEST:
            return {...state, loading:true,error:null}    
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
        case UPDATE_PROFILE_SUCCESS:
            return {...state, jwt:action.payload, loading:false,error:null}
        default:
            return state;
    
    }
}