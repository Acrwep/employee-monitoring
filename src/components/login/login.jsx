import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdSecurity } from 'react-icons/md';
import './login.css';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs = {};
        if (!form.email.trim()) errs.email = 'Email / Username is required';
        else if (form.email.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = 'Enter a valid email address';
        }
        if (!form.password) errs.password = 'Password is required';
        else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 1500);
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
                        <span className="logo-title">Emp CallTrack</span>
                        <span className="logo-sub">Admin Monitoring Portal</span>
                    </div>
                </div>

                <p className="login-subheading">Please enter your details to sign in</p>

                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    {/* Email */}
                    <div className={`field-group ${errors.email ? 'field-error' : ''}`}>
                        <label htmlFor="login-email">Email / Username</label>
                        <div className="input-wrapper">
                            <MdEmail className="input-icon" />
                            <input
                                id="login-email"
                                name="email"
                                type="text"
                                placeholder="admin@company.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="username"
                            />
                        </div>
                        {errors.email && <span className="error-msg">{errors.email}</span>}
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
                    Demo: use any email &amp; password (min 6 chars)
                </p>
            </div>
        </div>
    );
}
