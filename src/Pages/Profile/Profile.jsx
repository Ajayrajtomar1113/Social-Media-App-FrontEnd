import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../Components/Post/PostCard'
import UserReelCard from '../../Components/Reels/UserReelCard'
import { useSelector } from 'react-redux'
import ProfileModal from './ProfileModal'
const tabs=[
  {value:"post",name:"post"},
  {value:"reels",name:"Reels"},
  {value:"saved",name:"Saved"},
  {value:"repost",name:"Repost"}
]
const savedPost = [1,1,1,1,1]
const posts = [1,1,1,1,1]
const reels = [1,1,1,1,1]
function Profile() {
    const {id} = useParams()
    const [value, setValue] = React.useState('post');
    const {auth}= useSelector(store=>store);

      const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Card className='py-10 w-[100%] bg-orange-300'>
      <div className="rounded-md">
        <div className='h-[15rem]'>
          <img
          className='w-full h-full rounded-t-md'
          src="https://th.bing.com/th/id/OIP.U1MdjaXPL00AT-yoS2wuhAHaEo?w=316&h=197&c=7&r=0&o=7&pid=1.7&rm=3" alt="" />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar className='transform -translate-y-20' sx={{width:"8rem",height:"8rem"}} src='https://th.bing.com/th/id/OIP.XrGVljajcLZhvJGUD-Sc7gHaE7?w=261&h=180&c=7&r=0&o=7&pid=1.7&rm=3' />
        
          {true ? <Button sx={{borderRadius:"20px"}} variant='outlined' onClick={handleOpen}>Edit Profile</Button>:
          <Button variant='outlined'>Follow</Button>}
        </div>
        <div className="p-5">
          <div>
            <h1 className='py-1 text-xl font-bold'> 
               {auth.user?.firstName+" "+auth.user?.lastName}
            </h1>
            <p>@{auth.user?.firstName.toLowerCase()+"_"+auth.user?.lastName.toLowerCase()}</p>
            <div className="flex gap-4 items-center py-3">
              <span>19 post</span>
              <span>#0 followers</span>
              <span>32 followings</span>
            </div>
            <div>
              <p>Loremdsb asugdc aUYGCua cyuassxNSx</p>
            </div>
          </div>
          <section>
            <Box sx={{ width: '100%',borderBottom:1,borderColor:"divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >
    
                {tabs.map((item)=><Tab value={item.value} label={item.name} wrapped/>)}
              </Tabs>
            </Box>
            <div className="flex justify-center">
              {value === "post"? (<div className='space-y-5 w-[70%] my-10'>
                  {posts.map((item)=>(<div className='border border-slate-100 rounded-md'>
                    <PostCard></PostCard>
                    </div>))}
                </div>)
                :
                value === "reels"?<div className='flex flex-wrap justify-start items-start gap-5 my-10 pl-12'>
                    {reels.map((item)=><UserReelCard></UserReelCard>)}
                </div>
                :
                value === "saved"?<div className='flex flex-wrap justify-start items-start gap-5 my-10 pl-12'>
                    {savedPost.map((item)=><PostCard></PostCard>)}
                </div>
                :
                  (
                    <div className='flex flex-wrap justify-start items-start gap-5 my-10 pl-12'>
                    {savedPost.map((item)=><PostCard></PostCard>)}
                </div>
                  )}
            </div>
          </section>
        </div>
      </div>
      <section>
        <ProfileModal open={open} handleOpen={handleOpen} handleClose={handleClose}/>
      </section>
    </Card>
  )
}

export default Profile
