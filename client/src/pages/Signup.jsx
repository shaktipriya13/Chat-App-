import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';

function SignUp() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(
                `${serverUrl}/api/v1/auth/signup`,
                { username, email, password },
                {
                    withCredentials: true
                    // ka matlab hai browser cookies ko bhi bhejega/ request me include karega.
                    // Aur yeh sab hone ke baad response`result` variable me store hota hai.
                }
            );
            // dispatch(setUserData(result.data));
            navigate('/profile');
            setEmail('');
            setPassword('');
            setErr('');
        } catch (error) {
            console.log(error);
            setErr(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-[#FFE5B4] flex items-center justify-center">
            <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col gap-8">
                {/* Header Section */}
                <div className="w-full h-[200px] bg-[#FF8C00] rounded-b-[30%] shadow-md flex items-center justify-center">
                    <h1 className="text-white font-bold text-3xl">
                        Welcome to <span className="text-[#FFDAB9]">PingDrop</span>
                    </h1>
                </div>

                {/* Form */}
                <form className="w-full flex flex-col gap-5 items-center" onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-[90%] h-[50px] outline-none border-2 border-[#FF8C00] px-5 py-2 bg-[#FFF8F2] rounded-lg shadow-sm text-gray-800 text-lg"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-[90%] h-[50px] outline-none border-2 border-[#FF8C00] px-5 py-2 bg-[#FFF8F2] rounded-lg shadow-sm text-gray-800 text-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="w-[90%] h-[50px] border-2 border-[#FF8C00] rounded-lg shadow-sm relative bg-[#FFF8F2]">
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full h-full outline-none px-5 py-2 bg-transparent text-gray-800 text-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="absolute top-[10px] right-[20px] text-[17px] text-[#FF8C00] font-semibold cursor-pointer"
                            onClick={() => setShow((prev) => !prev)}
                        >
                            {show ? 'Hide' : 'Show'}
                        </span>
                    </div>

                    {err && <p className="text-red-500 font-medium text-sm">*{err}</p>}

                    <button
                        className="px-6 py-3 bg-[#FF8C00] text-white rounded-2xl shadow-md text-lg font-semibold hover:bg-[#e67600] transition-all duration-200 w-[200px]"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>

                    <p className="cursor-pointer text-sm text-gray-700" onClick={() => navigate('/login')}>
                        Already Have An Account?{' '}
                        <span className="text-[#FF8C00] font-bold">Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
