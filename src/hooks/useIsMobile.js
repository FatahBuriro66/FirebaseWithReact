import React, { useEffect, useState } from 'react'

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 550)
        }

        window.addEventListener('resize', handleResize())

        return () => {
            window.removeEventListener('resize', handleResize())
        }

    }, [])

    return { isMobile }
}

export default useIsMobile