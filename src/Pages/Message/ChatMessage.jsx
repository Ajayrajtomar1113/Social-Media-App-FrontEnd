import React from 'react'
import { useSelector } from 'react-redux'

function ChatMessage({item}) {
   const {auth}=useSelector(store=>store)
  const isReqUserMsg =auth.user.id === item.user.id
  return (
    <div className={`flex ${!isReqUserMsg?"justify-start":"justify-end"}`}>
      <div className={`p-1 ${item.image?"rounded-md":"px-5 rounded-full"} bg-zinc-200`}>
        {item.image && 
        <img
        className='w-[15rem] h-[17rem] object-cover rounded-md'
        src={item.image}/>
        }
        <p className={`${true?"py-1":"py-1"}`}>
            {item.content}
        </p>
      </div>
    </div>
  )
}

export default ChatMessage
