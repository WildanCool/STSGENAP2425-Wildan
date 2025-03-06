import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-montserrat">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User List</h1>
        <Link
          to="/onlyAdmin"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Admin Page
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Password:</strong> {user.password}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountPage;
