import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { navigationMenu } from './Sidebar/SidebarNavigation'
import { Avatar, Divider } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const auth= useSelector(store=>store.auth);
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()

  const handleProfile = () => {
    if (auth.user?.id) {
      navigate(`/home/profile/${auth.user.id}`);
    }
    handleClose();
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/"); 
    handleClose();
  };

  const handleNavigate = (item) => {
  switch (item.title) {

    case "Home":
      navigate("/home")
      break

    case "Reels":
      navigate("/home/reels")
      break

    case "Create Reel":
      navigate("/home/create_reel")
      break

    case "Profile":
      if (auth.user?.id) {
        navigate(`/home/profile/${auth.user.id}`)
      }
      break

    case "Message":
      navigate("/message")
      break

    default:
      console.log("No route found for", item.title)
  }
}
  return (
    <div className='card rounded-1xl flex flex-col justify-between h-screen py-1'>

  
  <div className="space-y-4 pl-3 ">
    <div>
      <span className='logo font-bold text-xl pl-5'>Social Media</span>
    </div>
    <Divider/>
    <div className="space-y-8">
      {navigationMenu.map((item,index)=>(
        <div key={item.title}
          onClick={()=>handleNavigate(item)}
          className='flex space-x-3 cursor-pointer items-center w-full hover:bg-gray-200 p-1.5 rounded-lg'>
          {item.icon}
          <p className='text-xl'>{item.title}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="pl-3 pb-10">
    <Divider/>

    <div className="flex justify-between items-center pt-5">
      <div className="flex items-center">
        <Avatar src={auth.user?.image}>
          {auth.user?.firstName?.[0]}
        </Avatar>

        <div className='pl-5'>
          <p className='font-bold'>
            {auth.user?.firstName+" "+auth.user?.lastName}
          </p>
          <p className='opacity-70'>
            @{auth.user?.firstName?.toLowerCase()+"_"+auth.user?.lastName?.toLowerCase()}
          </p> 
        </div>
      </div>

      <div>
        <Button onClick={handleClick}>
          <MoreVertIcon/>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  </div>

</div>
  )
}

export default Sidebar
