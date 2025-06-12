import React from 'react'
import Sidebar from '../../component/Sidebar'

const Profile = () => {
  return (
    <div>
        <Sidebar />
        <div className="ml-64 p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            {/* Profile details will go here */}
            <p>Profile details coming soon...</p>
        </div>
    </div>
  )
}

export default Profile