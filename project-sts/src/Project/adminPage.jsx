import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-montserrat">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Panel
        </h1>
        <div className="space-y-4">
          <Link
            to="/deleteAccountPage"
            className="text-sm text-blue-500 block text-center mt-2"
          >
            Delete Account?
          </Link>
          <Link
            to="/accountPage"
            className="text-sm text-blue-500 block text-center mt-2"
          >
            Account Information?
          </Link>
          <Link
            to="/updateAccountPage"
            className="text-sm text-blue-500 block text-center mt-2"
          >
            Update Account?
          </Link>
          <Link
            to="/product"
            className="text-sm text-blue-500 block text-center mt-2"
          >
            Back to Home
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
