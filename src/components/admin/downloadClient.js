import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
const Clientdownload = () => {
    const token = localStorage.getItem('token')
    if(!token){
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please login to Access this.',
        });
      window.location='/login'
    }
    const handleDownloadClick = () => {
        axios
          .get('https://crmbackend-tawny.vercel.app/downloadClientDataAll', {
            responseType: 'blob', // Set the response type to blob
          })
          .then((response) => {
            // Check if the response contains data
            if (response.data) {
              // Create a blob from the response data
              const blob = new Blob([response.data], {
                type: 'application/octet-stream', // Set the MIME type to application/octet-stream
              });
      
              // Create a download link element
              const downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(blob);
              downloadLink.download = 'Client-Data.pdf'; // Set the filename for the download
      
              // Trigger a click event on the download link to initiate the download
              downloadLink.click();
              Swal.fire({
                icon: 'success',
                title: 'Download Complete',
            
              });
            } else {
              // If there is no data in the response, show an error SweetAlert
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No data received for download.',
              });
            }
          })
          .catch((error) => {
            // Handle any errors and show an error SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while downloading Client data.',
            });
          });
      };
      
  return (
    <div className="center-div">
        
<button
  onClick={handleDownloadClick}
  className="btn-admin"
>
  Clientdownload
</button>
</div>

  )
}

export default Clientdownload