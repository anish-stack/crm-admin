import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MarkAttendance = () => {
  const [executiveId, setExecutiveId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState(''); // Default status is an empty string
  const [executiveData, setExecutiveData] = useState({}); // Store both ID and name

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
    // Load executive data from localStorage when the component mounts
    const storedData = localStorage.getItem('executiveData');
    if (storedData) {
      setExecutiveData(JSON.parse(storedData));
    }

    // Set the current date and time
    getCurrentDateTime();
  }, []);

  const handleExecutiveIdChange = (e) => {
    setExecutiveId(e.target.value);
  };

  const getCurrentDateTime = () => {
    // Get the current date and time in the India timezone
    const indiaTimezone = 'Asia/Kolkata';
    const now = new Date().toLocaleString('en-IN', { timeZone: indiaTimezone });
    const [currentDate, currentTime] = now.split(', ');
    setDate(currentDate);
    console.log(now)
    setTime(currentTime);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const markAttendance = async () => {
    try {
      const response = await axios.post('https://crmbackend-tawny.vercel.app/mark-attendance', {
        executiveId,
        date,
        time,
        status,
      });

      Swal.fire({
        icon: 'success',
        title: 'Attendance Marked',
        text: 'Attendance marked successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while marking attendance.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Mark Attendance</h1>
      <div className="form-group">
        <label htmlFor="executiveId">Executive:</label>
        <select
          id="executiveId"
          className="form-control"
          value={executiveId}
          onChange={handleExecutiveIdChange}
        >
          <option value="">Select an Executive</option>
          {Object.keys(executiveData).map((id) => (
            <option key={id} value={id}>
              {executiveData[id]} {/* Display the name */}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
  <label htmlFor="date">Date:</label>
  <input
    type="text"
    id="date"
    className="form-control"
    readOnly
    value={date}
    // Remove the empty arrow function from onChange
  />
</div>
<div className="form-group">
  <label htmlFor="time">Time:</label>
  <input
    type="text"
    id="time"
    className="form-control"
    readOnly
    value={time}
    // Remove the empty arrow function from onChange
  />
</div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          className="form-control"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Half Day">Half Day</option>
          <option value="Short Leave">Short Leave</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <button className="btn-admin mt-2" onClick={markAttendance}>
        Mark Attendance
      </button>
    </div>
  );
};

export default MarkAttendance;
