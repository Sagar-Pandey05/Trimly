import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../component/Sidebar";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const BookAppointment = () => {
    const { user } = useContext(AuthContext);
    const [barbers, setBarbers] = useState([]);
    const [formData, setFormData] = useState({
        barberId: "",
        date: "",
        time: "",
        service: ""
    });
    const today = new Date().toISOString().split("T")[0];

    // Fetch barbers from API
    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const res = await API.get("/barbers"); // You must have this endpoint
                setBarbers(res.data);
            } catch (err) {
                console.error("Failed to load barbers", err);
            }
        };
        fetchBarbers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { barberId, date, time, service } = formData;
        const token = localStorage.getItem("token");

        try {
            const res = await API.post("/appointment/book", {
                barberId,
                service,
                date,
                time
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert("Appointment request sent successfully!");
            setFormData({ barberId: "", date: "", time: "", service: "" });
        } catch (err) {
            console.error("Booking error:", err);
            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong while booking.";
            alert("Booking failed: " + message);
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 flex-1 p-10">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">📅 Book an Appointment</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Barber Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Barber</label>
                            <select
                                name="barberId"
                                value={formData.barberId}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Choose Barber --</option>
                                {barbers.map(barber => (
                                    <option key={barber._id} value={barber._id}>{barber.name} -- {barber.address}_{barber.mobile}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={today}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Time Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Service Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                            <input
                                type="text"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                placeholder="Haircut, Beard, etc."
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                        >
                            Book Now
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default BookAppointment;
