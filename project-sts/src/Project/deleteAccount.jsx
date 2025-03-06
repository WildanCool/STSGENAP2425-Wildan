import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const DeleteAccountPage = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleDeleteUser = (e) => {
    e.preventDefault();
    axios
      .delete(`https://api.escuelajs.co/api/v1/users/${userId}`)
      .then((response) => {
        setMessage(`User with ID: ${userId} deleted`);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });

    setUserId("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg font-montserrat">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Update User</h1>
        <Link
          to="/onlyAdmin"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Admin Page
        </Link>
      </div>
      <form onSubmit={handleDeleteUser} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-600 font-medium">User ID</label>
          <input
            type="text"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete User
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAccountPage;
