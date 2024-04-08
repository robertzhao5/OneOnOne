import React, {useState} from "react";
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import axios from "axios";


function RegistrationForm() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register/', userData)
            console.log('Account created', response.data);
        } catch (error) {
            console.error('Registration Error', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <img className="mb-4 rounded" src={logo} alt="" width="72" height="59"/>
            <h1 className="h3 mb-3 fw-normal">Create your account</h1>

            <p>Already have an account? <Link to="/login" className="text-body-secondary">Log In</Link></p>

            <div className="form-floating mt-3">
                <input
                    className="form-control"
                    id="floatingName"
                    type="text"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                />
                <label htmlFor="floatingName">Name</label>
            </div>

            <div className="form-floating">
                <input
                    className="form-control"
                    id="floatingInput"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
                <input
                    className="form-control"
                    id="floatingPassword"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating">
                <input
                    className="form-control"
                    id="floatingConfirmPassword"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            </div>

            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" id="termsConditions"/>
                <label className="form-check-label" htmlFor="termsConditions">
                    I agree to the <a href="#" className="text-white">terms and conditions</a>
                </label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Create Account</button>
            <p className="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
        </form>
    );
}

export default RegistrationForm;
