import React from 'react';
const Home = React.lazy(() => import('./screens/Home/Home'));
const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        extract:true
    }
]
export default routes