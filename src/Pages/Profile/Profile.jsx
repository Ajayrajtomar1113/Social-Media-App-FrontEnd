import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import PostCard from '../../Components/Post/PostCard'
import UserReelCard from '../../Components/Reels/UserReelCard'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from './ProfileModal'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteUserAction, followUserAction, getUserById } from '../../Redux/Auth/auth.action'

function Profile() {
  const navigate = useNavigate()
  const [value, setValue] = React.useState('post');
  const auth = useSelector(store => store.auth);
  const post = useSelector(store => store.post);

  const dispatch = useDispatch();
  const { id } = useParams();

  const isOwnProfile = auth.user?.id === Number(id);

  const tabs = isOwnProfile
    ? [
        { value: "post", name: "Posts" },
        { value: "reels", name: "Reels" },
        { value: "saved", name: "Saved" },
        { value: "repost", name: "Repost" }
      ]
    : [
        { value: "post", name: "Posts" },
        { value: "reels", name: "Reels" }
      ];
  const handleFollow=(id)=>{
        dispatch(followUserAction(id))
      }
  useEffect(() => {
    if (!isOwnProfile) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!isOwnProfile && (value === "saved" || value === "repost")) {
      setValue("post");
    }
  }, [isOwnProfile]);

  const deleteProfile = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  
  if (confirmDelete) {
    await dispatch(deleteUserAction(id));
    navigate("/");
  }
}
  const currentUser = isOwnProfile ? auth.user : auth.profile;

  const [open, setOpen] = React.useState(false);

  if (!currentUser) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <Card className='w-full max-w-4xl py-3'>

        {/* Cover */}
        <div className='h-[8rem] sm:h-[12rem]'>
          <img
            className='w-full h-full object-cover'
            src="https://th.bing.com/th/id/OIP.U1MdjaXPL00AT-yoS2wuhAHaEo"
            alt=""
          />
        </div>

        {/* Avatar + Info */}
        <div className="px-3 sm:px-5 flex flex-col sm:flex-row sm:justify-between">

          <div className="flex gap-3 items-center">
            <Avatar
              className='-mt-10 sm:-mt-14'
              sx={{
                width: { xs: "4rem", sm: "7rem" },
                height: { xs: "4rem", sm: "7rem" }
              }}
              src='https://th.bing.com/th/id/OIP.XrGVljajcLZhvJGUD-Sc7gHaE7'
            />

            <div>
              <h1 className='font-bold text-sm sm:text-lg'>
                {currentUser?.firstName} {currentUser?.lastName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                @{currentUser?.firstName?.toLowerCase()}_{currentUser?.lastName?.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="mt-2 sm:mt-4">
            {isOwnProfile ? (
              <Button onClick={() => setOpen(true)} size="small" variant='outlined'>
                Edit
              </Button>
            ) : 
            auth?.user?.role === "ADMIN"?(<Button onClick={() => deleteProfile(currentUser.id)} size="small" variant='outlined'>
                Delete
              </Button>
              ):
            (
              <Button size="small" variant='outlined' onClick={() => handleFollow(auth.profile.id)}>{auth.user?.followings?.includes(auth?.profile?.id) ? "Unfollow" : "Follow"}</Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="px-3 sm:px-5 py-2 flex gap-4 text-xs sm:text-sm">
          <span>{post.posts?.filter(p => p.user?.id === currentUser?.id).length || 0} posts</span>
          <span>{currentUser?.followers?.length || 0} followers</span>
          <span>{currentUser?.followings?.length || 0} following</span>
        </div>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1 }}>
          <Tabs value={value} onChange={(e,v)=>setValue(v)} variant="scrollable">
            {tabs.map(tab => (
              <Tab key={tab.value} value={tab.value} label={tab.name} />
            ))}
          </Tabs>
        </Box>

        {/* Content FIXED WIDTH */}
        <div className="w-full max-w-3xl mx-auto px-2 py-4">

          {value === "post" && (
            <div className="space-y-3">
              {post.posts?.filter(p => p.user?.id === currentUser?.id)
                .map(item => (
                  <PostCard key={item.id} item={item} />
                ))}
            </div>
          )}

          {value === "reels" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {post.reels?.filter(r => r.user?.id === currentUser?.id)
                .map(item => (
                  <UserReelCard key={item.id} item={item} />
                ))}
            </div>
          )}

          {value === "saved" && isOwnProfile && (
            <div className="space-y-3">
              {auth.user?.savedPost?.map(item => (
                <PostCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {value === "repost" && isOwnProfile && (
            <div className="text-center py-10">Coming Soon 🚀</div>
          )}

        </div>

        <ProfileModal open={open} handleClose={() => setOpen(false)} />
      </Card>
    </div>
  )
}

export default Profile