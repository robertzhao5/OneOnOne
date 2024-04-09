import React, {useState} from "react";
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import axios from "axios";


function LoginForm() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
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
            console.log('Logged in', response.data);
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
                    className="form-control"
                    id="floatingUsername"
                    type="text"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="username"
                    required
                />
                <label htmlFor="floatingUsername">Username</label>
            </div>

            <div className="form-floating mb-3">
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

            <button className="btn btn-primary w-100 py-2" type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;
