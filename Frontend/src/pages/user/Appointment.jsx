import React from 'react'
import Sidebar from '../../component/Sidebar'

const Appointment = () => {
  return (
    <div>
        <Sidebar />
        <div className="ml-64 p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
            {/* Appointment list will go here */}
            <p>Appointment List coming soon...</p>
        </div>
    </div>
  )
}

export default Appointment