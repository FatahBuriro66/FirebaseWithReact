import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig'

function PrivateRoute({ children }) {
    const navigate = useNavigate()
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            if (!user) {
                window.location.replace('/auth')
            } else {
                setIsUser(true)
            }
        })
    },[])


    if (!isUser) return null


    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute