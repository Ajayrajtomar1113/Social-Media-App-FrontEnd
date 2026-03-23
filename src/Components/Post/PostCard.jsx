import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/Post.action';
import { isLikedByReqUser } from '../../utils/isLikedByRequser';

function PostCard({item}) {
  
const [showComments,setShowComments] = useState(false)
const handleShowComment=()=>setShowComments(!showComments);
const dispatch = useDispatch()
const auth=useSelector(store=>store.auth)

const handleCreateComment=(content)=>{
      const reqData={
        postId:item.id,
        data:content
        
      }
      dispatch(createCommentAction(reqData))
    }
const handleLikePost=()=>{
  dispatch(likePostAction(item.id))
}
  return (
    <Card className=''>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item?.user?.firstName+" "+item?.user?.lastName}
        subheader={"@"+item?.user?.firstName.toLowerCase()+"_"+item?.user?.lastName.toLowerCase()}
      />
      <CardMedia
        component="img"
        height="194"
        image={item?.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {item?.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className='flex justify-between'>
        <div>
          <IconButton 
          onClick={handleLikePost}
          >
            {isLikedByReqUser(auth?.user?.id,item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
          </IconButton>  
          <IconButton onClick={handleShowComment}>
            { <ChatBubbleIcon/>}
          </IconButton>  
          <IconButton>
            { true?<BookmarkIcon/>:<BookmarkBorderIcon/>}
          </IconButton> 
        </div>  
        <div>
          <IconButton>
            { <ShareIcon/>}
          </IconButton>  
        </div>

      </CardActions>
      {showComments && <section>
        <div className="flex items-center space-x-5 mx-3 my-5">
          <Avatar sx={{}}/>
          <input onKeyDown={(e)=>{
            if(e.key==="Enter"){
              handleCreateComment(e.target.value);
            }
          }} type="text" className="w-full bg-transparent border border-[#3b4050] rounded-full px-5 py-2" placeholder='write your comments...'/>
         
        </div>
        <Divider/>
        {item.comments?.map((comment) => (
          <div key={comment.id} className="mx-3 space-y-2 my-5 text-xs">
            <div className="flex items-center space-x-5">
              <Avatar sx={{ height: "2rem", width: "2rem", fontSize: "0.8rem" }}>
                {comment?.user?.firstName[0]}
              </Avatar>

              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </section>}
    </Card>
  )
}

export default PostCard
