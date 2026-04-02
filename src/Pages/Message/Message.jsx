import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import { Avatar, Backdrop, CircularProgress, IconButton } from '@mui/material';
import AddCallIcon from '@mui/icons-material/AddCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../Components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from '../../utils/uploadToCloudnary';
import { useNavigate } from 'react-router-dom';

import { connectWebSocket, disconnectWebSocket } from "../../utils/WebSocket";

function Message() {

const navigate = useNavigate();
const [currentChat, setCurrentChat] = useState(null);
const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(false);
const [selectedImage, setSelectedImage] = useState("");

const dispatch = useDispatch();
const message = useSelector(store => store.message);
const auth = useSelector(store => store.auth);

const chatContainerRef = useRef();

useEffect(() => {
dispatch(getAllChats());
}, []);

// 🔥 WS CONNECT (ONLY RECEIVE)
useEffect(() => {
if (currentChat) {

  disconnectWebSocket();

  connectWebSocket(currentChat.id, (msg) => {
    setMessages((prev) => {
      if (prev.some(m => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  });
}

return () => disconnectWebSocket();

}, [currentChat]);

const handleSelectImage = async (event) => {
setLoading(true);
const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
setSelectedImage(imgUrl);
setLoading(false);
};

// 🔥 SEND MESSAGE (ONLY REST)
const handleCreateMessage = async (value) => {
if (!value && !selectedImage) return;

dispatch(createMessage({
  chatId: currentChat.id,
  content: value,
  image: selectedImage
}));

setSelectedImage("");

};

const goToHome = () => navigate('/home');

useEffect(() => {
if (chatContainerRef.current) {
chatContainerRef.current.scrollTop =
chatContainerRef.current.scrollHeight;
}
}, [messages]);

return ( <div className="grid grid-cols-12 h-screen overflow-y-hidden">

  <div className="col-span-3 p-4 bg-zinc-100">
    <div className="flex h-full">
      <div className="w-full">

        <div className="flex space-x-4 items-center py-5 cursor-pointer" onClick={goToHome}>
          <WestIcon />
          <h1 className='text-xl font-bold'>Home</h1>
        </div>

        <div className='h-[83vh]'>
          <SearchUser isChat={true} />

          <div className="h-full space-y-4 mt-4 overflow-y-scroll hideScrollbar">
            {message.chats.map((item) => (
              <div key={item.id} onClick={() => {
                setCurrentChat(item);
                setMessages(item.messages || []);
              }}>
                <UserChatCard chat={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>

  <div className="col-span-9 h-full">

    {currentChat ? (
      <div>

        <div className="flex justify-between items-center border-1 p-5">
          <div className="flex items-center space-x-3">
            <Avatar />
            <p>
              {auth.user.id === currentChat.users[0].id
                ? currentChat.users[1].firstName + " " + currentChat.users[1].lastName
                : currentChat.users[0].firstName + " " + currentChat.users[0].lastName}
            </p>
          </div>

          <div className="flex space-x-3">
            <IconButton><AddCallIcon /></IconButton>
            <IconButton><VideoCallIcon /></IconButton>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className='overflow-y-scroll h-[82vh] px-2 space-y-5 pl-5 pb-20'
        >
          {messages.map((item, index) => (
            <ChatMessage key={item.id || index} item={item} />
          ))}
        </div>

        <div className='sticky bottom-0 border-l'>

          {selectedImage &&
            <img src={selectedImage} className='w-[10rem]' alt="" />
          }

          <div className="py-5 flex items-center space-x-2">

            <input
              type="text"
              className='border rounded-full w-[90%] py-3 px-5'
              placeholder='Type message...'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateMessage(e.target.value);
                  e.target.value = "";
                }
              }}
            />

            <input type="file" hidden id='image-input' onChange={handleSelectImage}/>
            <label htmlFor="image-input">
              <AddPhotoAlternateIcon />
            </label>

          </div>
        </div>

      </div>
    ) : (
      <div className='h-full flex flex-col justify-center items-center'>
        <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
        <p>No chat selected</p>
      </div>
    )}

  </div>

  <Backdrop open={loading}>
    <CircularProgress />
  </Backdrop>

</div>

);
}

export default Message;
