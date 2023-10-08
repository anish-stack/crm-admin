import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import contact from '../../assest/contact.jpg'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
       
        confirmPassword: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://crmbackend-tawny.vercel.app/register', formData);
          console.log('Registration successful!', response.data);
            // Show a success alert using Swal
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered.',
      });
      setTimeout(()=>{
        window.location.href = `/otp-verification?email=${formData.email}`;
      },5000)
          // You can redirect or perform other actions here after successful registration
        } catch (error) {
          console.error('Registration failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Registration could not be completed. Please try again later.',
          });
        }
      };
  
  return (
    <div className='container m-auto extra-reg'>
    <div className='row'>
      <div className='col-lg-6'>
        <img src={contact} className='img-fluid' alt='' />
      </div>
      <div className='col-lg-6'>
        <h2 className='text-center'>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
              Username:
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>
        
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password:
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>
          <button type='submit' className='btn-admin'>
            Register
          </button>
        </form>
      </div>
    </div>
  </div>

  )
}

export default Register