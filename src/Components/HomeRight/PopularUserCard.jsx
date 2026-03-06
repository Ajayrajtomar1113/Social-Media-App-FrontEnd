import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
function PopularUserCard() {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
         <Button size='small'>
            Follow
         </Button>
        }
        title="Ajay Raj"
        subheader="@ajayraj"
      />
    </div>
  )
}

export default PopularUserCard
