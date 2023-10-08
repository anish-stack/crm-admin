import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllExecutive = () => {
  const [executives, setExecutives] = useState([]);
  const token = localStorage.getItem('token')
  if(!token){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please login to Access this.',
      });
    window.location='/login'
  }
  useEffect(() => {
    // Fetch data from the API using Axios
    axios
      .get('https://crmbackend-tawny.vercel.app/getExecutive')
      .then((response) => {
        const responseData = response.data;

        if (responseData.success) {
          setExecutives(responseData.executive);
             // Create an object to store executive IDs with names
      const executiveData = {};
      responseData.executive.forEach((executive) => {
        executiveData[executive._id] = executive.username; // Assuming 'username' is the name property
      });

      // Store the executive data in localStorage
      localStorage.setItem('executiveData', JSON.stringify(executiveData));

          Swal.fire({
            icon: 'success',
            title: 'executive Found',
            text: 'executive details loaded successfully!',
          });
        } else {
          // Handle API response with errors
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: responseData.message || 'Failed to fetch executive data.',
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch executive data. Please try again later.',
        });
      });
  }, []);

 


  return (
    <div className="container mt-5">
      <h1>All Executives</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>role</th>
            <th>email</th>
            <th>working</th>

            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {executives.map((executive, index) => (
            <tr key={index}>
              <td>{executive.username}</td>
              <td>{executive.role}</td>
              <td>{executive.email}</td>
              <td>{executive.isActivated ? 'Yes' : 'No'}</td>              {/* Add more table cells for other executive attributes */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllExecutive;
