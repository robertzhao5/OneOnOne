import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import axios from "axios";


function LoginForm() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

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
        if (!userData.password) validationErrors.password = 'Password is required.';

        // stop submission if errors exist
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;


        try {
            const response = await axios.post('/api/token/', userData)
            console.log('Logged in', response.data);

            // save to local store
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);

            // navigate to user dashboard
            navigate('/dashboard');
            console.log('navigated')
        } catch (error) {
            console.error('Login Error', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <img className="mb-4 rounded" src={logo} alt="" width="72" height="59"/>
            <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

            <p>Don't have an account? <Link to="/signup" className="text-body-secondary">Sign
                Up</Link></p>

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

            <div className="form-floating mb-3">
                <input
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
                <div className="invalid-feedback">{errors.password}</div>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;
