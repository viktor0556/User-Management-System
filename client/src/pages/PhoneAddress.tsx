import React, {useEffect, useState} from 'react';
import { updateUser, getUserById } from '../services/api';
import Logout from '../components/LogOut';
import { useNavigate } from 'react-router-dom';

const PhoneAddress: React.FC = () => {

  const [cellphone, setCellphone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      const storedEmail = localStorage.getItem("email");

      if (!userId || !storedEmail) {
        console.error("No userId or email found in localStorage");
        return;
      }

      try {
        const user = await getUserById(userId);
        setCellphone(user.cellphone || "");
        setAddress(user.address || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    console.log("Save button clicked");
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);
    if (userId) {
      try {
        console.log("Sending update request", { cellphone, address });
        const updatedUser = await updateUser(userId, cellphone, address);
        console.log("Update Successful", updatedUser);
        alert('Update Successful')
      } catch (error) {
        console.error("Update Error:", error);
      }
    } else {
      console.error("No userId found");
    }
  };

  const userPage = () => {
    navigate('/user')
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Phone and Address</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Cellphone:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Address:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="w-full mt-2 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        onClick={userPage}
      >
        Go to user page
      </button>
      <div className="mt-4">
        <Logout />
      </div>
    </div>
  );
};

export default PhoneAddress;