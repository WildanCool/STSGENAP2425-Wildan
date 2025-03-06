import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateAccountPage = () => {
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "customer",
    avatar: "https://i.imgur.com/LDOO4Qs.jpg",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    axios
      .post("https://api.escuelajs.co/api/v1/users", newUser)
      .then((response) => {
        setMessage(`User Created: ${response.data.name}`);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });

    setFormData({
      email: "",
      password: "",
      name: "",
      role: "customer",
      avatar: "https://i.imgur.com/LDOO4Qs.jpg",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-montserrat">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleCreateUser} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create User
          </button>
        </form>
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">Back To Login</Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
