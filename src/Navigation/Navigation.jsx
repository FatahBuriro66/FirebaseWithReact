import React from 'react'
import {
    createBrowserRouter,
    createHashRouter,
    RouterProvider
} from 'react-router-dom'
// Router Mechanism Import
import PrivateRoute from './PrivateRoute'
// imports Layouts
import AuthLayout from '../layouts/AuthLayout'
// imports Pages
import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'
import DashboardLayout from '../layouts/DashboardLayout'
import Posts from '../pages/Posts'
import NotFound from '../pages/NotFound'


const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                path: '',
                element: <App />
            },
            {
                path: '/posts',
                element: <Posts />
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    }
], { basename: '/firebase-react/' })


function Navigation() {
    return (
        <RouterProvider
            router={router}
        />
    )
}

export default Navigation