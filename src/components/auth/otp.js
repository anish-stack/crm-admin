import React, { useState, useEffect } from 'react';
import './otp.css';
import Swal from 'sweetalert2';

const OTPVerification = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if a submission is in progress

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.match(/^\d*$/)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus on the next input box if there is a value
      if (value !== '' && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the OTP from the array
    const enteredOTP = otp.join('');

    // Send the email and OTP to the server for verification
    try {
      setIsSubmitting(true);

      const response = await fetch('https://crmbackend-tawny.vercel.app/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: enteredOTP,
        }),
      });

      if (response.ok) {
        // Success: Redirect or perform other actions
        console.log('Verification successful');
        Swal.fire({
          icon: 'success',
          title: 'Verification Successful',
          text: 'You have been successfully verified.',
        });
        setTimeout(()=>{
            window.location.href="/executive"
        })
      } else {
        // Error: Display an error message
        console.error('Verification failed');
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: 'Verification could not be completed. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Verification failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: 'Verification could not be completed. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Retrieve the email from the URL parameter
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  return (
    <div className="otp-verification">
      <h2 className="text-success extra-text">Enter OTP</h2>
      <p className="text-para">We've sent you a 6-digit verification code.</p>
      <div className="otp-input-container">
        {otp.map((digit, index) => (
          <input
            type="text"
            id={`otp-input-${index}`}
            key={index}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            maxLength="1"
          />
        ))}
      </div>
      <div className="email-input hidden">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className='hidden'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="submit-button"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </button>
    </div>
  );
};

export default OTPVerification;
