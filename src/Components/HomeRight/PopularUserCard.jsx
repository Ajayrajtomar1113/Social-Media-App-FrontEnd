import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction } from '../../Redux/Auth/auth.action';

function PopularUserCard({item}) {

  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch()
  const handleFollow=(id)=>{
      dispatch(followUserAction(id))
    }
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item?.firstName?.[0]}
          </Avatar>
        }
        action={
         <Button size='small' onClick={() => handleFollow(item.id)}>
            {user?.followings?.includes(item.id) ? "Unfollow" : "Follow"}
          </Button>
        }
        title={item.firstName+" "+item.lastName}
        subheader={"@"+item?.firstName?.toLowerCase()+"_"+item?.lastName?.toLowerCase()}
      />
    </div>
  )
}

export default PopularUserCard
