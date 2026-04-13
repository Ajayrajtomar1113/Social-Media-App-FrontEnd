import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (chatId, onMessageReceived, onPostDeleted) => {

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS("https://social-media-chat-app-jg41.onrender.com/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("WebSocket Connected");

      if (chatId) {
        stompClient.subscribe(`/topic/chat/${chatId}`, (message) => {
          const msg = JSON.parse(message.body);
          onMessageReceived(msg);
        });
      }

      stompClient.subscribe("/topic/delete-post", (message) => {
        const postId = message.body;
        console.log("🗑️ Post Deleted:", postId);

        if (onPostDeleted) {
          onPostDeleted(postId);
        }
      });
    }
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("🔌 WebSocket Disconnected");
  }
};