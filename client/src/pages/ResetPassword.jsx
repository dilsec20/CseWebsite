import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, Loader, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');

    const [formData, setFormData] = useState({
        email: emailParam || '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { email, otp, newPassword, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        if (newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            });

            const parseRes = await response.json();

            if (response.ok) {
                setSuccess(true);
                toast.success("Password reset successfully!");
                setTimeout(() => navigate('/login'), 3000);
            } else {
                toast.error(parseRes.error || "Failed to reset password");
            }
        } catch (err) {
            console.error(err.message);
            toast.error("Server error");
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
                        <p className="text-gray-600 mb-6">
                            Your password has been successfully updated. Redirecting to login...
                        </p>
                        <Link
                            to="/login"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login Now
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Set new password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter the OTP sent to {email} and your new password.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                OTP Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    maxLength="6"
                                    value={otp}
                                    onChange={onChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3 tracking-widest text-center font-mono text-lg"
                                    placeholder="123456"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="newPassword" class="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={onChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3 pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" class="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={onChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                        Resetting...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
