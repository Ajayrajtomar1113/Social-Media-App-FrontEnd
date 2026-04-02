// import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
// import React, { useEffect } from 'react'
// import PostCard from '../../Components/Post/PostCard'
// import UserReelCard from '../../Components/Reels/UserReelCard'
// import { useDispatch, useSelector } from 'react-redux'
// import ProfileModal from './ProfileModal'
// import { useParams } from 'react-router-dom'
// import { getUserById } from '../../Redux/Auth/auth.action'

// function Profile() {

//   const [value, setValue] = React.useState('post');
//   const auth = useSelector(store => store.auth);
//   const post = useSelector(store => store.post);

//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const isOwnProfile = auth.user?.id === Number(id);

//   const tabs = isOwnProfile
//     ? [
//         { value: "post", name: "Posts" },
//         { value: "reels", name: "Reels" },
//         { value: "saved", name: "Saved" },
//         { value: "repost", name: "Repost" }
//       ]
//     : [
//         { value: "post", name: "Posts" },
//         { value: "reels", name: "Reels" }
//       ];

//   useEffect(() => {
//     if (!isOwnProfile) {
//       dispatch(getUserById(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (!isOwnProfile && (value === "saved" || value === "repost")) {
//       setValue("post");
//     }
//   }, [isOwnProfile]);

//   const currentUser = isOwnProfile ? auth.user : auth.profile;

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const [open, setOpen] = React.useState(false);

//   if (!currentUser) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="w-full flex justify-center px-2 sm:px-5">
//       <Card className='w-full max-w-5xl py-3 bg-orange-300'>

//         {/* Cover */}
//         <div className='h-[10rem] sm:h-[15rem]'>
//           <img
//             className='w-full h-full object-cover rounded-t-md'
//             src="https://th.bing.com/th/id/OIP.U1MdjaXPL00AT-yoS2wuhAHaEo"
//             alt=""
//           />
//         </div>

//         {/* Avatar + Button */}
//         <div className="px-3 sm:px-5 flex flex-col sm:flex-row sm:justify-between sm:items-start">

//           <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//             <Avatar
//               className='-mt-12 sm:-mt-16'
//               sx={{ width: { xs: "5rem", sm: "8rem" }, height: { xs: "5rem", sm: "8rem" } }}
//               src='https://th.bing.com/th/id/OIP.XrGVljajcLZhvJGUD-Sc7gHaE7'
//             />

//             <div className="mt-2 sm:mt-10">
//               <h1 className='text-lg sm:text-xl font-bold'>
//                 {currentUser?.firstName + " " + currentUser?.lastName}
//               </h1>

//               <p className="text-sm text-gray-700">
//                 @{currentUser?.firstName?.toLowerCase()}_{currentUser?.lastName?.toLowerCase()}
//               </p>
//             </div>
//           </div>

//           <div className="mt-3 sm:mt-5">
//             {isOwnProfile ? (
//               <Button onClick={() => setOpen(true)} variant='outlined'>
//                 Edit Profile
//               </Button>
//             ) : (
//               <Button variant='outlined'>Follow</Button>
//             )}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="px-3 sm:px-5 py-3 flex gap-4 text-sm sm:text-base flex-wrap">
//           <span>
//             {post.posts?.filter(p => p.user?.id === currentUser?.id).length || 0} posts
//           </span>
//           <span>{currentUser?.followers?.length || 0} followers</span>
//           <span>{currentUser?.followings?.length || 0} following</span>
//         </div>

//         {/* Bio */}
//         <div className="px-3 sm:px-5 pb-3">
//           <p className="text-sm">Bio here...</p>
//         </div>

//         {/* Tabs */}
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons="auto"
//           >
//             {tabs.map((item) => (
//               <Tab key={item.value} value={item.value} label={item.name} />
//             ))}
//           </Tabs>
//         </Box>

//         {/* Content */}
//         <div className="flex justify-center px-2">

//           {/* POSTS */}
//           {value === "post" && (
//             <div className='w-full sm:w-[80%] md:w-[70%] my-6 space-y-4'>
//               {post.posts
//                 ?.filter((p) => p.user?.id === currentUser?.id)
//                 .map((item) => (
//                   <div key={item.id} className='border rounded-md'>
//                     <PostCard item={item} />
//                   </div>
//                 ))}
//             </div>
//           )}

//           {/* REELS */}
//           {value === "reels" && (
//             <div className='flex flex-wrap justify-center gap-4 my-6'>
//               {post.reels
//                 ?.filter((reel) => reel.user?.id === currentUser?.id)
//                 .map((item) => (
//                   <UserReelCard key={item.id} item={item} />
//                 ))}
//             </div>
//           )}

//           {/* SAVED */}
//           {value === "saved" && isOwnProfile && (
//             <div className='w-full sm:w-[80%] md:w-[70%] my-6 space-y-4'>
//               {auth?.user?.savedPost?.map((item) => (
//                 <div key={item.id} className='border rounded-md'>
//                   <PostCard item={item} />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* REPOST */}
//           {value === "repost" && isOwnProfile && (
//             <div className='pt-10 text-center'>Repost coming soon</div>
//           )}

//         </div>

//         <ProfileModal open={open} handleClose={() => setOpen(false)} />
//       </Card>
//     </div>
//   )
// }

// export default Profile

import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import PostCard from '../../Components/Post/PostCard'
import UserReelCard from '../../Components/Reels/UserReelCard'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from './ProfileModal'
import { useParams } from 'react-router-dom'
import { followUserAction, getUserById } from '../../Redux/Auth/auth.action'

function Profile() {

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
            ) : (
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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