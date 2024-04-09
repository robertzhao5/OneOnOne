import React, {useState} from "react";
import {Link} from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import axios from "axios";


function RegistrationForm() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const {name, value} = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // reset errors
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationErrors = {};
        if (!userData.username) validationErrors.username = 'Username is required.';
        if (!userData.email) validationErrors.email = 'Email is required.';
        if (!userData.password) validationErrors.password = 'Password is required.';
        if (userData.password !== userData.confirm_password) validationErrors.confirm_password = 'Passwords do not match.';

        // stop submission if errors exist
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            const response = await axios.post('accounts/api/register/', userData)
            console.log('Account created', response.data);
        } catch (error) {
            console.error('Registration Error', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <img className="mb-4 rounded" src={logo} alt="" width="72" height="59"/>
            <h1 className="h3 mb-3 fw-normal">Create your account</h1>

            <p>Already have an account? <Link to="/login" className="text-body-secondary">Log
                In</Link></p>

            <div className="form-floating mt-3">
                <input
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="floatingUsername"
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="username"
                    required
                />
                <label htmlFor="floatingUsername">Username</label>
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            <div className="form-floating">
                <input
                    className="form-control"
                    id="floatingFirst"
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                />
                <label htmlFor="floatingFirst">First Name</label>
            </div>

            <div className="form-floating">
                <input
                    className="form-control"
                    id="floatingLast"
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                />
                <label htmlFor="floatingLast">First Name</label>
            </div>

            <div className="form-floating">
                <input
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="floatingInput"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                />
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-floating">
                <input
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="form-floating">
                <input
                    className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                    id="floatingConfirmPassword"
                    type="password"
                    name="confirm_password"
                    value={userData.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
            </div>

            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" id="termsConditions"/>
                <label className="form-check-label" htmlFor="termsConditions">
                    I agree to the <a href="#" className="text-white">terms and
                    conditions</a>
                </label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Create Account
            </button>
        </form>
    );
}

export default RegistrationForm;
