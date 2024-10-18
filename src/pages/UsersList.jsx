import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../components/LogoutBtn";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Check if token exists in localStorage or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${page}`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [page]);

  // Check if the next page has users before navigating
  const handleNext = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page + 1}`
      );
      if (response.data.data.length > 0) {
        setPage(page + 1);
      } else {
        alert("There are no more users");
      }
    } catch (error) {
      console.error("Error fetching next page: ", error);
    }
  };

  // filter users
  const filterUsers = searchQuery
    ? users.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return (
          fullName.startsWith(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      })
    : users;

  const editHandler = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const deleteHandler = async (id) => {
    try {
      alert("Are you sure you want to delete this user ?")
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert('User deleted successfully!')
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen p-4 userList-background">
      <div className="header">
        <h2 className="text-3xl font-bold text-center mb-6 pt-4 text-black">
          Users List
        </h2>
        <LogoutBtn logoutHandler={logoutHandler} />
      </div>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterUsers.length > 0 ? (
          filterUsers.map((user) => (
            <div
              key={user.id}
              className="card-gradient p-4 rounded-lg shadow-md text-white"
            >
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-center font-semibold">
                {user.first_name} {user.last_name}
              </p>
              <div className="mt-4 flex justify-around">
                <button
                  className="bg-white text-black py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => editHandler(user.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-white text-black py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => deleteHandler(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-red-500">No users found</p>
        )}
      </div>
      {filterUsers.length >= 6 ? (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2 disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
            onClick={handleNext}
            disabled={users.length === 0}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UsersList;
