"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, User, FileText } from 'lucide-react';
import Image from 'next/image';
import logo from "../../../public/images/logo.png"
import signups from "../../../public/images/signups.png"
import Footer from './footer';

export default function HRSignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
    };

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
    };

    return (
        <div className="min-h-screen   flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full opacity-20"></div>
                <div className="absolute top-20 left-20 w-32 h-32  rounded-full opacity-30"></div>
            </div>

            <div className="relative w-full max-w-4xl mx-auto">
                <div className=" shadow-2xl bg-gray-100 overflow-hidden">
                    <div className="text-center">
                        <div className="flex items-center justify-center p-8">

                            <Image
                                src={logo}
                                alt="Description of image"
                                width={500}
                                height={100}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row">

                        {/* Left side - Illustration */}
                        <div className="lg:w-1/2 bg-gradient-to-br  p-8 lg:p-12 flex items-center justify-center">
                            <div className="text-center space-y-6">
                                <div className="relative">
                                    {/* Main illustration */}
                                    <div className="w-64 h-64 mx-auto relative">
                                        <Image
                                            src={signups}
                                            alt="Description of image"
                                            width={500}
                                            height={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1 h-[400px] bg-black self-center"></div>

                        {/* Right side - Login form */}
                        <div className="lg:w-1/2 p-8 lg:p-12">

                            <div className="max-w-md mx-auto">
                                {/* Login/Sign Up tabs */}
                                <div className="flex items-end justify-start space-x-6 mb-8">
                                    <button className="text-blue-200 text-xl border-blue-400">
                                        Login
                                    </button>
                                    <div className="w-px h-10 bg-black mt-2"></div>

                                    <button className="text-blue-600 text-4xl font-semibold hover:text-gray-600">
                                        <span className="relative">
                                            Sign
                                            <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-yellow-400"></span>
                                        </span>
                                        Up
                                    </button>
                                </div>


                                {/* Login form */}
                                <div className="space-y-2">
                                    <div>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="First Name"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-blue-300 bg-blue-50  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Last Name"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-blue-300 bg-blue-50  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-blue-300 bg-blue-50   rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-blue-300 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Re-enter Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-blue-300 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r mt-6 from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                                    >
                                        Sign Up
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span>Sign Up with Google</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}