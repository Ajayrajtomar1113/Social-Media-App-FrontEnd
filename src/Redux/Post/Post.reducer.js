import { CREATE_POST_FAILURE, CREATE_POST_SUCCESS, CREATE_POST_REQUEST, GET_ALL_POST_REQUEST, LIKE_POST_SUCCESS, GET_ALL_POST_FAILURE, LIKE_POST_FAILURE, GET_ALL_POST_SUCCESS, LIKE_POST_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, CREATE_REEL_FAILURE, GET_ALL_REEL_SUCCESS, GET_ALL_REEL_REQUEST, GET_ALL_REEL_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS } from "./Post.actionType";

const initialState = {
    post:null,
    loading:false,
    error:null,
    posts:[],
    like:null,
    comments:[],
    newComment:null,
    reels:[]
}

export const postReducer = (state = initialState,action)=>{
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case CREATE_REEL_REQUEST:
        case GET_ALL_REEL_REQUEST:  
        case DELETE_COMMENT_REQUEST:  
            return {...state,error:null,loading:true} 
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            }
        case GET_ALL_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading:false,
                error:null
            };
    
        case GET_ALL_REEL_SUCCESS:
            return {
                ...state,
                reels: action.payload,
                loading:false,
                error:null
            }    
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                newComment:action.payload,
                loading:false,
                error:null
            }
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) =>
                item.id === action.payload.id
                    ? { ...item, ...action.payload, user: item.user }
                    : item
                ),
                loading: false,
                error: null
            };

        case CREATE_REEL_SUCCESS:
            return {
                ...state,
                reels: action.payload,
                loading: false,
                error: null
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => ({
                    ...post,
                    comments: post.comments.filter(
                        comment => comment.id !== action.payload
                    )
                })),
                loading: false,
                error: null
            };
        case CREATE_REEL_FAILURE:    
        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case GET_ALL_REEL_FAILURE:    
            return {...state,error:action.payload,loading:false}        
        default:
            return state;
    }
}