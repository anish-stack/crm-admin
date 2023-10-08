import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import contact from "../../assest/contact.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://crmbackend-tawny.vercel.app/login",
        formData
      );
      console.log("Login successful!", response.data);

      // Show a success alert using Swal
      localStorage.setItem('token',response.data.token)
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in.",
      });

      // Use history.push to navigate to the home page
    window.location.href="/"
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Login could not be completed. Please try again later.",
      });
    }
  };

  return (
    <div className="container m-auto extra-reg">
      <div className="row">
        <div className="col-lg-6">
          <img src={contact} className="img-fluid" alt="" />
        </div>
        <div className="col-lg-6">
          <h2 className="text-center">login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn-admin">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
