import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListIcon from '@mui/icons-material/List';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const navigationMenu=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/"
    },
    {
        title:"Reels",
        icon:<ExploreIcon/>,
        path:"/reels"
    },
    {
        title:"Create Reel",
        icon:<ControlPointIcon/>,
        path:"/create_reels"
    },
    {
        title:"Notifications",
        icon:<NotificationsIcon/>,
        path:"/"
    },
    {
        title:"Message",
        icon:<MessageIcon/>,
        path:"/message"
    },
    // {
    //     title:"Lists",
    //     icon:<ListIcon/>,
    //     path:"/"
    // },
    // {
    //     title:"Communities",
    //     icon:<GroupIcon/>,
    //     path:"/"
    // },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile:id"
    }

]