import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const UpdateAccountPage = () => {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("Please enter a user ID.");
      setIsSuccess(false);
      return;
    }

    axios
      .put(`https://api.escuelajs.co/api/v1/users/${userId}`, formData)
      .then((response) => {
        setMessage(`User updated: ${response.data.name}`);
        setIsSuccess(true);
        setUserId("");
        setFormData({ name: "", email: "", password: "" });
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
        setIsSuccess(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-montserrat">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Update Account
        </h1>
        <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-600 font-medium">User ID</label>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter New Name"
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter New Email"
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter New Password"
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Update User
          </button>

          {message && (
            <p
              className={`text-center mt-2 ${
                isSuccess ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <div className="text-center mt-4">
          <Link
            to="/onlyAdmin"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Admin Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccountPage;
