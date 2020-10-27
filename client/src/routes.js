import React from 'react';
const Home = React.lazy(() => import('./screens/Home/Home'));
const Profile = React.lazy(() => import("./screens/Profile/Profile"));
const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        extract:true
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        extract: true
    }
]
export default routes