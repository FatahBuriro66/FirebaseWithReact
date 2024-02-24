import React from 'react'
import { Outlet } from 'react-router-dom'


function AuthLayout() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-5 col-12 m-auto pt-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout