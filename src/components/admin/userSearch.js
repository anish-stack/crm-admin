import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserSearch = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token')
  if(!token){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please login to Access this.',
      });
    window.location='/login'
  }

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchUserById = async () => {
    try {
      const response = await axios.post('https://crmbackend-tawny.vercel.app/executive-details', { id: userId });
      setUser(response.data.users);
      Swal.fire({
        icon: 'success',
        title: 'User Found',
        text: 'User details loaded successfully!',
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'User Not Found',
          text: 'User with the specified ID was not found.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching the user.',
        });
      }
      setUser(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Search for a User</h1>
      <div className="form-group">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          className="form-control"
          value={userId}
          onChange={handleUserIdChange}
        />
      </div>
      <button className="btn btn-primary" onClick={fetchUserById}>
        Fetch User
      </button>
      {user && (
        <div className="mt-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">User Details</h2>
              <p className="card-text">ID: {user._id}</p>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">Username: {user.username}</p>
              <p className="card-text">Role: {user.role}</p>
              {/* Include other user details here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
