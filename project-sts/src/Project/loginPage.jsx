import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("admin", "false"); // Default admin status
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get("https://api.escuelajs.co/api/v1/users")
      .then((usersResponse) => {
        const users = usersResponse.data;
        const user = users.find((u) => u.email === email);

        if (!user) {
          throw new Error("User not found!");
        }

        return axios.post("https://api.escuelajs.co/api/v1/auth/login", { email, password });
      })
      .then((loginResponse) => {
        localStorage.setItem("authToken", loginResponse.data.access_token);
        
        if (email === "adminbujar@gmail.com") {
          localStorage.setItem("admin", "true");
        } else {
          localStorage.setItem("admin", "false");
        }
        
        navigate("/product");
      })
      .catch((error) => {
        setError("Login failed! Please check your email and password.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-montserrat">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          <Link to="/createAccount" className="text-sm text-blue-500 block text-center mt-2">Create Account?</Link>
        </form>

        {error && <div className="mt-4 text-center text-red-600"><p>{error}</p></div>}
      </div>
    </div>
  );
};

export default LoginPage;
