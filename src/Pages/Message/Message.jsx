import React, { useEffect, useState } from 'react'
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

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


function Message() {

  const [currentChat,setCurrentChat]=useState()
  const [messages,setMessages]  = useState([])
  const [loading,setLoading] = useState(false)
  const [selectedImage,setSelectedImage] = useState()
  const dispatch = useDispatch() 
  const {message,auth}=useSelector(store=>store)

  const handleSelectImage=async (event)=>{
    setLoading(true)
    console.log("handle select image")
    const imgUrl = await uploadToCloudinary(event.target.files[0],"image");
    setSelectedImage(imgUrl)
    setLoading(false)
  }


  useEffect(()=>{
    dispatch(getAllChats())
  },[])

  useEffect(()=>{
    setMessages([...messages,message.message])
  },[message.message])
  const handleCreateMessage=(value)=>{
    const message = {
      chatId:currentChat.id,
      content:value,
      image:selectedImage
    }
    dispatch(createMessage(
      // {message,sendMessageToServer},
    message))
  }

//  const [stompClient, setStompClient] = useState(null);

// useEffect(() => {

//   const socket = new SockJS("http://localhost:8080/ws");

//   const stomp = new Client({
//   webSocketFactory: () => socket,
//   connectHeaders: {
//     Authorization: `Bearer ${localStorage.getItem("jwt")}`
//   },
//     reconnectDelay: 5000,

//     onConnect: () => {
//       console.log("websocket connected");
//     },

//     onStompError: (frame) => {
//       console.log("error", frame);
//     }
//   });

//   stomp.activate();
//   setStompClient(stomp);

//   return () => {
//     if (stomp) {
//       stomp.deactivate();
//     }
//   };

// }, []);


// useEffect(() => {
//   if (stompClient && auth.user && currentChat) {

//     const subscription = stompClient.subscribe(`/topic/chat/${currentChat.id}`, onMessageReceive);

//     return () => {
//       subscription.unsubscribe();
//     };
//   }

// }, [stompClient, auth.user, currentChat]);


// const onMessageReceive = (message) => {
//   const data = JSON.parse(message.body);
//   console.log("message received from websocket", data);
// };


// const sendMessageToServer = (newMessage) => {
//   if (stompClient && newMessage) {

//     stompClient.publish({
//       destination: `/app/chat/${currentChat?.id}`,
//       body: JSON.stringify(newMessage)
//     });

//   }
// };
  return (
    // <div className="min-h-screen w-full bg-zinc-200">
      
      <div className="grid grid-cols-12 h-screen overflow-y-hidden">
        <div className="col-span-3 p-4 bg-zinc-100">
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
              <WestIcon></WestIcon>
              <h1 className='text-xl font-bold'>Home</h1>
            </div>
            <div className='h-[83vh]'>
              <div>
                <SearchUser/>
              </div>
              <div className="h-full space-y-4 mt-4 overflow-y-scroll hideScrollbar">
                {
                  message.chats.map((item)=>{
                    return <div onClick={()=>{
                      setCurrentChat(item)
                      setMessages(item.messages)
                    }}> 
                      <UserChatCard chat={item}/>
                    </div>
                  })
                }
                
              
              </div>
            </div>
            </div>
          </div>
        </div>

       
        <div className="col-span-9 h-full">
          {currentChat ? 
            <div>
              <div className="flex justify-between items-center border-1 p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'/>
                  <p>{auth.user.id===currentChat.users[0].id?currentChat.users[1].firstName+" "+currentChat.users[1].lastName:currentChat.users[0].firstName+" "+currentChat.users[0].lastName}</p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddCallIcon/>
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon/>
                  </IconButton>
                </div>
              </div>
              <div className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 pl-5 pb-20'>
                {messages.map((item)=><ChatMessage item={item}/>)}
              </div>
              <div className='sticky bottom-0 border-l'>
                {selectedImage && <img src={selectedImage} className='w-[10rem] h-[5rem] object-cover px-2' alt="" />}
                <div className="py-5 flex items-center justify-center space-x-2">
                  
                  <input type="text"  
                  className='bg-transparent border border-[#575a66] outline-none rounded-full w-[90%] py-3 px-5' 
                  onKeyDown={(e)=>{
                    if(e.key==="Enter" && e.target.value){
                      handleCreateMessage(e.target.value);
                      setSelectedImage("")
                      e.target.value="";
                    }
                   
                  }}
                  placeholder='Type message...'/>
                  <div>
                    <input type="file" accept='image/*' 
                    onChange={handleSelectImage} 
                    className='hidden' 
                    id='image-input'
                    />
                    <label htmlFor="image-input"><AddPhotoAlternateIcon/></label>
                  </div>
                </div>
              </div>
          </div>:
          <div className='h-full space-y-5 flex flex-col justify-center items-center'>
            <ChatBubbleOutlineIcon sx={{fontSze:"15rem"}}/>
            <p className="text-xl font-semibold">
              no chat selected
            </p>
          </div>
            }
          
        </div>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
     </div>
     
  )
}

export default Message
