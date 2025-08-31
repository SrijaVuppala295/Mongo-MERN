import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'donor', // default role
        bloodGroup: '',
        phone: '',
        pincode: ''
    });

    const navigate = useNavigate();

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, role, bloodGroup, phone, pincode } = signupInfo;

        // Basic validation
        if (!name || !email || !password || !confirmPassword || !role || !phone || !pincode || !bloodGroup) {
            return handleError('Please fill all required fields');
        }

        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }

        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0]?.message || 'Signup failed';
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Full Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm your password...'
                        value={signupInfo.confirmPassword}
                    />
                </div>
                <div>
                    <label htmlFor='role'>Role</label>
                    <select
                        name='role'
                        value={signupInfo.role}
                        onChange={handleChange}
                    >
                        <option value='donor'>Donor</option>
                        <option value='recipient'>Recipient</option>
                    </select>
                </div>
                
                    <div>
                        <label htmlFor='bloodGroup'>Blood Group</label>
                        <select
                            name='bloodGroup'
                            value={signupInfo.bloodGroup}
                            onChange={handleChange}
                        >
                            <option value=''>Select Blood Group</option>
                            {bloodGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>

              

                
                <div>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        onChange={handleChange}
                        type='tel'
                        name='phone'
                        placeholder='Enter your phone number...'
                        value={signupInfo.phone}
                    />
                </div>
                <div>
                    <label htmlFor='pincode'>Pincode</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='pincode'
                        placeholder='Enter your area pincode...'
                        value={signupInfo.pincode}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to="/login"> Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup;
