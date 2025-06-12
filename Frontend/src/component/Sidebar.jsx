import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
      <h2 className="text-3xl font-bold mb-4">Trimly</h2>
      <hr className="mb-4 border-gray-600"/>
      <ul className="space-y-4">
        <li><Link to="/user" className="hover:text-amber-400">Dashboard</Link></li>
        <li><Link to="/user/book" className="hover:text-amber-400">Book Appointment</Link></li>
        <li><Link to="/user/appointments" className="hover:text-amber-400">My Appointments</Link></li>
        <li><Link to="/user/profile" className="hover:text-amber-400">Profile</Link></li>
      </ul>
      <button onClick={logout} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
        Logout  
      </button>
    </div>
  );
};

export default Sidebar;
