import React from "react";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard p-5 font-sans bg-[#1A1A1A]">
      <h1 className="text-center text-2xl font-bold text-[#FF1493]">
        Welcome to the Admin Dashboard
      </h1>
      <div className="dashboard-sections flex justify-around mt-5 gap-5">
        <div className="section bg-white p-4 rounded-lg shadow-md w-1/3">
          <h2 className="text-blue-900 text-lg font-semibold">Manage Users</h2>
          <p className="text-gray-600">View, edit, or delete user accounts.</p>
        </div>
        <div className="section bg-white p-4 rounded-lg shadow-md w-1/3">
          <h2 className="text-blue-900 text-lg font-semibold">Manage Content</h2>
          <p className="text-gray-600">
            Create, update, or delete content for the platform.
          </p>
        </div>
        <div className="section bg-white p-4 rounded-lg shadow-md w-1/3">
          <h2 className="text-blue-900 text-lg font-semibold">Analytics</h2>
          <p className="text-gray-600">
            View platform usage statistics and reports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
