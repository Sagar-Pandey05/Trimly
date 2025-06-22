import Sidebar from "../../component/Sidebar";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex bg-blue-100 h-screen">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-4xl font-semibold mb-4">Welcome to the Trimly</h1>
        <p className="text-lg">Hi <em><i>{user?.name}, </i></em> Welcome to the world of <strong>TRIMLY</strong>. We are offering you the best services. Here are some of them: </p>
        <ul type="disc" className="mt-4 list-disc pl-6">
          <li>Instantly discover professional barbers near you.</li>
          <li>Book appointments online — no waiting in line.</li>
          <li>Choose your preferred barber and view their availability.</li>
          <li>Receive real-time appointment confirmations and updates.</li>
          <li>Access your appointment history anytime.</li>
          <li>Secure and user-friendly booking experience.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
