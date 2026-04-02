import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

function UserChatCard({ chat }) {
  const auth = useSelector(store => store.auth);

  if (!chat || !chat.users) return null;

  const isUser1 = auth.user?.id === chat.users[0]?.id;
  const otherUser = isUser1 ? chat.users[1] : chat.users[0];

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250"
            }}
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={`${otherUser?.firstName || ""} ${otherUser?.lastName || ""}`}
      />
    </Card>
  );
}
export default UserChatCard
