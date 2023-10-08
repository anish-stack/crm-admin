import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClientsAll = () => {
  const [clients, setClients] = useState([]);
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
      .get('https://crmbackend-tawny.vercel.app/admin/clients')
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);

        if (responseData.success) {
          setClients(responseData.clients);
          Swal.fire({
            icon: 'success',
            title: 'Client Find Successful',
            text: 'You have successfully Find.',
          });
        } else {
          // Handle API response with errors
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: responseData.message || 'Failed to fetch clients data.',
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch clients data. Please try again later.',
        });
      });
  }, []);

  return (
    <div className="container-fluid mt-5">
  <h1 className="admin-all">All clients</h1>
  <div className="table-responsive">
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Business Website Name</th>
          <th>Package</th>
          <th>Customer Requirements</th>
          <th>Discounts</th>
          <th>Follow Up</th>
          <th>Message Send</th>
          <th>Submitted By</th>
          <th>Follow Up Date</th>
          {/* Add more table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {clients.map((client, index) => (
          <tr key={index}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.mobileNumber}</td>
            <td>{client.businessWebsiteName}</td>
            <td>{client.package}</td>
            <td>{client.customerRequirements}</td>
            <td>{client.discounts}</td>
            <td>{client.followUp ? 'Yes' : 'No'}</td>
            <td>{client.messageSend ? 'Yes' : 'No'}</td>
            <td>{client.submittedBy}</td>
            <td>{client.followUpDate}</td>
            {/* Add more table cells for other client attributes */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ClientsAll;
