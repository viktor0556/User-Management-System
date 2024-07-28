import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/api";
import { UserInterface } from "../types/User";
import Logout from "../components/LogOut";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await getAllUsers(token);
          const filteredUsers = response.filter(
            (user) => user.role !== "admin"
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== parseInt(id, 10)));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Admin Dashboard</h1>
      </header>
      <ul>
        {users.map((user) => (
          <li className="border px-4 py-2" key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user.id.toString())}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
        {<Logout />}
      </ul>
    </div>
  );
};

export default Admin;
