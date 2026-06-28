import React from 'react'
import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                {children}
            </div>
        </>
    )
}

export default MainLayout