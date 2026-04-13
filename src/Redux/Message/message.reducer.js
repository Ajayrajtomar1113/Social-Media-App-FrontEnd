
import * as actionType from "./message.actionType";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {

    /* =========================
       REQUEST STATES
    ========================= */
    case actionType.CREATE_MESSAGE_REQUEST:
    case actionType.CREATE_CHAT_REQUEST:
    case actionType.GET_ALL_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };


    /* =========================
       CREATE MESSAGE
    ========================= */
    case actionType.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        messages: [...state.messages, action.payload] // ✅ append message
      };


    /* =========================
       CREATE CHAT
    ========================= */
    case actionType.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: [action.payload, ...state.chats]
      };


    /* =========================
       GET ALL CHATS
    ========================= */
    case actionType.GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload // ✅ already clean array from action
      };


    /* =========================
       FAILURE STATES
    ========================= */
    case actionType.CREATE_MESSAGE_FAILURE:
    case actionType.CREATE_CHAT_FAILURE:
    case actionType.GET_ALL_CHATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};
