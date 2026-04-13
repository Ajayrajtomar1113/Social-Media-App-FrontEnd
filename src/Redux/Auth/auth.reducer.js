import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  SEARCH_USER_SUCCESS,
  GET_ALL_USER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  SAVE_POST_REQUEST, SAVE_POST_SUCCESS, SAVE_POST_FAILURE,
  GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS
} from "./auth.actionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  profile: null,
  searchUser: [],
  users: []
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    /* =========================
       LOADING STATES
    ========================= */
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case GET_ALL_USER_REQUEST:
    case FOLLOW_REQUEST:
    case SAVE_POST_REQUEST:
    case GET_USER_BY_ID_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };


    /* =========================
       AUTH SUCCESS
    ========================= */
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        error: null
      };


    /* =========================
       PROFILE
    ========================= */
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    case "GET_USER_BY_ID_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        loading: false
      };


    /* =========================
       USERS
    ========================= */
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,   // ✅ already clean array from action
        loading: false,
        error: null
      };

    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,   // ✅ NO .data/.content here
        loading: false,
        error: null
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id !== action.payload.id
        )
      };


    /* =========================
       FOLLOW / SAVE POST
    ========================= */
    case FOLLOW_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    case SAVE_POST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };


    /* =========================
       FAILURES
    ========================= */
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
    case FOLLOW_FAILURE:
    case GET_USER_BY_ID_FAILURE:
    case SAVE_POST_FAILURE:
    case GET_ALL_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    /* =========================
       LOGOUT
    ========================= */
    case "LOGOUT":
      return {
        ...state,
        jwt: null,
        user: null,
        loading: false,
        error: null
      };


    default:
      return state;
  }
};
