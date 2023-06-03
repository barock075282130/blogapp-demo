import React from 'react'

const Sidebar = ({ children }) => {
    return (
        <>
            <aside className='w-40 bg-gray-400 h-screen'>
                <h1>Dashboard</h1>
                <h1>Blog</h1>
                <h1>User</h1>
            </aside>
            <main>
                {children}
            </main>
        </>
    )
}

export default Sidebar