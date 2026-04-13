import {
  CREATE_POST_FAILURE, CREATE_POST_SUCCESS, CREATE_POST_REQUEST,
  GET_ALL_POST_REQUEST, LIKE_POST_SUCCESS, GET_ALL_POST_FAILURE,
  LIKE_POST_FAILURE, GET_ALL_POST_SUCCESS, LIKE_POST_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, CREATE_REEL_FAILURE,
  GET_ALL_REEL_SUCCESS, GET_ALL_REEL_REQUEST, GET_ALL_REEL_FAILURE,
  DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS,
  DELETE_POST_REQUEST, DELETE_POST_SUCCESS,
  DELETE_REEL_SUCCESS, DELETE_REEL_FAILURE, DELETE_REEL_REQUEST
} from "./Post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  comments: [],
  newComment: null,
  reels: []
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {

    /* =========================
       LOADING
    ========================= */
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case CREATE_REEL_REQUEST:
    case GET_ALL_REEL_REQUEST:
    case DELETE_COMMENT_REQUEST:
    case DELETE_POST_REQUEST:
    case DELETE_REEL_REQUEST:
      return { ...state, loading: true, error: null };


    /* =========================
       CREATE POST
    ========================= */
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null
      };


    /* =========================
       GET POSTS
    ========================= */
    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,   // ✅ already cleaned in action
        loading: false,
        error: null
      };


    /* =========================
       DELETE POST
    ========================= */
    case DELETE_POST_SUCCESS:
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post.id !== Number(action.payload)
        )
      };


    /* =========================
       LIKE POST
    ========================= */
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


    /* =========================
       COMMENTS
    ========================= */
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: action.payload,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...(post.comments || []), action.payload]
              }
            : post
        ),
        loading: false,
        error: null
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => ({
          ...post,
          comments: (post.comments || []).filter(
            (comment) => comment.id !== action.payload
          )
        })),
        loading: false,
        error: null
      };


    /* =========================
       REELS
    ========================= */
    case GET_ALL_REEL_SUCCESS:
      return {
        ...state,
        reels: action.payload,   // ✅ clean array from action
        loading: false,
        error: null
      };

    case CREATE_REEL_SUCCESS:
      return {
        ...state,
        reels: [action.payload, ...state.reels],
        loading: false,
        error: null
      };

    case DELETE_REEL_SUCCESS:
      return {
        ...state,
        reels: state.reels.filter(
          (reel) => reel.id !== action.payload
        )
      };


    /* =========================
       FAILURES
    ========================= */
    case CREATE_REEL_FAILURE:
    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case GET_ALL_REEL_FAILURE:
    case DELETE_REEL_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };


    default:
      return state;
  }
};
