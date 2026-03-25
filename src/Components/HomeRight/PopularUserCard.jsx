import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
function PopularUserCard({item}) {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item?.firstName?.[0]}
          </Avatar>
        }
        action={
         <Button size='small'>
            Follow
         </Button>
        }
        title={item.firstName+" "+item.lastName}
        subheader={"@"+item?.firstName?.toLowerCase()+"_"+item?.lastName?.toLowerCase()}
      />
    </div>
  )
}

export default PopularUserCard
