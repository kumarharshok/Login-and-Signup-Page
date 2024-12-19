import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import Validation from './LoginValidation';
import axios from 'axios';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          console.log("Response from server:", res.data);
          navigate('/');
        })
        .catch(err => console.log("Error during signup:", err));
    }
    setIsSubmitting(false);
  }, [errors, isSubmitting, navigate, values]);

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form action="" onSubmit={handleSubmit}>
          <h2>Sign-Up</h2>
          <div className="form-group">
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="text" placeholder="Enter Name" name='name' onChange={handleInput} className="input-full-width" />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email"><strong>Email address</strong></label>
            <input type="email" placeholder="Enter email" name='email' onChange={handleInput} className="input-full-width" />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder="Enter Password" name='password' onChange={handleInput} className="input-full-width" />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className="login-button"><strong>Sign up</strong></button>
          <p>You agree to our terms and conditions.</p>
          <Link to={"/"} className="signup-button">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
