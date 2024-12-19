import React, { useState, useEffect } from 'react';
import './Login.css'; // Import the CSS file
import { Link, useNavigate } from "react-router-dom"; // Correct import
import Validation from "./LoginValidation";
import axios from 'axios'; // Ensure axios is imported

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Correct usage

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            axios.post('http://localhost:8081/login', values)
                .then((res) => {
                    if (res.data === "Login Successfull") {
                        navigate("/home"); // Correct usage
                    } else {
                        alert("Invalid Credentials");
                    }
                })
                .catch(err => console.log(err));
        }
        setIsSubmitting(false);
    }, [errors, isSubmitting, navigate, values]);

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign-In</h2>
                <form action="" onSubmit={handleSubmit}>
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
                    <button type='submit' className="login-button"><strong>Log in</strong></button>
                    <p>You agree to our terms and conditions.</p>
                    <Link to={"/signup"} className="signup-button">Don't have an account? Sign up here.</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
