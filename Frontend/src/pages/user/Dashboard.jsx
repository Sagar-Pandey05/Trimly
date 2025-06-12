import Sidebar from "../../component/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>
        <p className="mt-4 text-gray-700">You can book appointments, check status, and more.</p>
      </div>
    </div>
  );
};

export default Dashboard;
