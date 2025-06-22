import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../component/Sidebar";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";


const Appointment = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get(`/appointment/my`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    };
    fetchAppointments();
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>

        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appt) => (
              <div key={appt._id} className="border-l-4 border-blue-500 bg-white shadow-md rounded p-4">
                <p><strong>Barber:</strong> {appt.barber?.name || "N/A"}</p>
                <p><strong>Service:</strong> {appt.service}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={
                    appt.status === "approved" ? "text-green-600 font-semibold"
                    : appt.status === "rejected" ? "text-red-500 font-semibold"
                    : appt.status === "rescheduled" ? "text-yellow-600 font-semibold"
                    : "text-gray-700"
                  }>
                    {appt.status}
                  </span>
                </p>

                {appt.status === "rejected" && appt.rescheduleNote && (
                  <p className="text-sm mt-2 text-yellow-700 italic">
                    Suggested Time: {appt.rescheduleNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
