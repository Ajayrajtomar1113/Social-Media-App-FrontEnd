import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (chatId, onMessageReceived, onPostDeleted) => {

  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("WebSocket Connected");

      // ✅ CHAT SUBSCRIPTION
      if (chatId) {
        stompClient.subscribe(`/topic/chat/${chatId}`, (message) => {
          const msg = JSON.parse(message.body);
          onMessageReceived(msg);
        });
      }

      // 🔥 DELETE POST SUBSCRIPTION (NEW)
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