import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (chatId, onMessageReceived) => {


stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
        console.log("WebSocket Connected");

        stompClient.subscribe(`/topic/chat/${chatId}`, (message) => {
            console.log("📩 RAW MESSAGE:", message.body);

            const msg = JSON.parse(message.body);
            onMessageReceived(msg);
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
