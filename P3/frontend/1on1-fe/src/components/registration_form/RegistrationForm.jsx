import React, {useState} from "react";
import axios from "axios";

function RegistrationForm(){
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
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
            <input
                type="text"
                value={userData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="email"
                value={email}
                onChange={userData.handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />d
            <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} placeholder="First Name"/>
            <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} placeholder="Last Name"/>

            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
