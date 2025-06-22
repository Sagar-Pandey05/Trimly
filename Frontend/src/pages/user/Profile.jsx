import React, { useContext } from 'react';
import Sidebar from '../../component/Sidebar';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <div className='bg-blue-100 border-2px border-gray-80 h-[80vh] w-[40vw] m-auto flex flex-col items-center rounded-2xl shadow-xl'>
          <img
            src="https://static.turbosquid.com/Preview/2014/05/16__04_27_45/tguy5_render04.jpga63a5f0e-5c90-4bdd-99f2-88c6dd24d224Zoom.jpg"
            alt="UserAnime"
            className='h-32 w-32 rounded-full mt-10'
          />
          <div className="mt-8 text-left w-3/4 select-none">
            <h2 className="text-3xl bg-red-200 rounded-lg p-3 font-bold mb-2 text-center">Profile Details</h2>
            <hr className='border-gray-600 my-4' />
            <p><strong>Name:</strong> {user?.name || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            <p><strong>Address:</strong> {user?.address || "N/A"}</p>
            <p><strong>Mobile:</strong> {user?.mobile || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;