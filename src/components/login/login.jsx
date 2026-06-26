import React, { useState } from 'react';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdSecurity } from 'react-icons/md';
import './login.css';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ mobile_number: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs = {};
        if (!form.mobile_number.trim()) {
            errs.mobile_number = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(form.mobile_number)) {
            errs.mobile_number = 'Enter valid 10 digit mobile number';
        }

        if (!form.password) errs.password = 'Password is required';
        else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validate();

        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        try {
            setLoading(true);

            const response = await login({
                mobile_number: form.mobile_number,
                password: form.password
            });

            console.log(response.data);

            if (response.data.success) {

                localStorage.setItem(
                    'AccessToken',
                    response.data.token
                );

                localStorage.setItem(
                    'user_id',
                    response.data.user_id
                );

                localStorage.setItem(
                    'full_name',
                    response.data.full_name
                );

                localStorage.setItem(
                    'mobile_number',
                    response.data.mobile_number
                );

                navigate('/dashboard');
            }

        } catch (error) {

            alert(
                error?.response?.data?.message ||
                'Invalid phone number or password'
            );

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
    };

    return (
        <div className="login-root">
            {/* Animated background blobs */}
            <div className="login-bg">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
            </div>

            <div className="login-card">
                {/* Logo area */}
                <div className="login-logo">
                    <span className="logo-icon"><MdSecurity /></span>
                    <div className="logo-text">
                        <span className="logo-title">Monitor 360</span>
                        <span className="logo-sub">Admin Monitoring Dashboard</span>
                    </div>
                </div>

                <p className="login-subheading">Please enter your details to sign in</p>

                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    {/* Email */}
                    <div className={`field-group ${errors.mobile_number ? 'field-error' : ''}`}>
                        <label htmlFor="login-mobile">User Mobile Number</label>
                        <div className="input-wrapper">
                            <MdEmail className="input-icon" />
                            <input
                                id="login-mobile"
                                name="mobile_number"
                                type="text"
                                placeholder="Enter Mobile Number"
                                value={form.mobile_number}
                                onChange={handleChange}
                            // autoComplete="username"
                            />
                        </div>
                        {errors.mobile_number && <span className="error-msg">{errors.mobile_number}</span>}
                    </div>

                    {/* Password */}
                    <div className={`field-group ${errors.password ? 'field-error' : ''}`}>
                        <label htmlFor="login-password">Password</label>
                        <div className="input-wrapper">
                            <MdLock className="input-icon" />
                            <input
                                id="login-password"
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPass(s => !s)}
                                aria-label="Toggle password visibility"
                            >
                                {showPass ? <MdVisibilityOff /> : <MdVisibility />}
                            </button>
                        </div>
                        {errors.password && <span className="error-msg">{errors.password}</span>}
                    </div>

                    <div className="login-options">
                        <label className="remember-label">
                            <input type="checkbox" id="remember-me" />
                            <span>Remember me</span>
                        </label>
                        <a href="#forgot" className="forgot-link">Forgot password?</a>
                    </div>

                    <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                        {loading ? (
                            <><span className="spinner" />Signing in...</>
                        ) : 'Sign In'}
                    </button>
                </form>

                <p className="login-hint">
                    Demo: Enter valid Mobile Number and Password
                </p>
            </div >
        </div >
    );
}
