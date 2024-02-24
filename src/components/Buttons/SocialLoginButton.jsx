import React ,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { Button } from 'antd';
import { auth } from '../../configs/firebaseConfig'

function SocialLoginButton() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const handleGoogleAuth = async () => {

        
        try {
            setLoading(true)
            await setPersistence(auth, browserSessionPersistence)

            const GoogleProvider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, GoogleProvider)
            setLoading(false)
            let user = { token: result?.user.accessToken, photo: result?.user.photoURL, uid: result?.user?.uid }
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
        } catch (error) {
            console.log("Error", error);
            setLoading(false)
        }
    }


    return (
        <Button
            block
            className='mb-2'
            onClick={handleGoogleAuth}
            loading={loading}
        >Login with Google</Button>
    )
}

export default SocialLoginButton