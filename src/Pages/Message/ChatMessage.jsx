import React from 'react'

function ChatMessage() {
  return (
    <div className={`flex ${true?"justify-start":"justify-end"}`}>
      <div className={`p-1 ${true?"rounded-md":"px-5 rounded-full"} bg-zinc-200`}>
        {true && 
        <img
        className='w-[12rem] h-[17rem] object-cover rounded-md'
        src='https://images.pexels.com/photos/36443917/pexels-photo-36443917.jpeg'/>
        }
        <p className={`${true?"py-1":"py-1"}`}>
            sdnjwD....
        </p>
      </div>
    </div>
  )
}

export default ChatMessage
