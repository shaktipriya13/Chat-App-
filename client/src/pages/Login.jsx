// jo bhi user details aaye ha login me usko humko store krana ha ,for this we use redux
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import { useDispatch } from 'react-redux';
import { setUserData,setSelectedUser } from '../redux/user.slice.js';

function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/v1/auth/login`, {
                email, password
            }, { withCredentials: true });
            dispatch(setUserData(result.data));
            dispatch(setSelectedUser(null));
            console.log("Dispatched userData:", result.data);
            navigate("/");
            setEmail("");
            setPassword("");
            setLoading(false);
            setErr("");
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErr(error?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className='w-full h-screen bg-[#FFE5B4] flex items-center justify-center'>
            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-md flex flex-col gap-[30px]'>
                <div className='w-full h-[200px] bg-[#FFA500] rounded-b-[30%] shadow-md flex items-center justify-center'>
                    <h1 className='text-white font-bold text-[30px]'>Login to <span className='text-[#FFE5B4]'>PingDrop</span></h1>
                </div>
                <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder='Email'
                        className='w-[90%] h-[50px] outline-none border-2 border-[#FF8C00] px-[20px] py-[10px] bg-white rounded-lg shadow-inner text-gray-700 text-[19px]'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className='w-[90%] h-[50px] border-2 border-[#FF8C00] overflow-hidden rounded-lg shadow-inner relative'>
                        <input
                            type={show ? "text" : "password"}
                            placeholder='Password'
                            className='w-full h-full outline-none px-[20px] py-[10px] bg-white text-gray-700 text-[19px]'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <span
                            className='absolute top-[10px] right-[20px] text-[19px] text-[#FF7F50] font-semibold cursor-pointer'
                            onClick={() => setShow(prev => !prev)}
                        >
                            {show ? "hide" : "show"}
                        </span>
                    </div>
                    {err && <p className='text-red-600 font-semibold'>*{err}</p>}
                    <button
                        className='px-[20px] py-[10px] bg-[#FF8C00] rounded-2xl shadow-lg text-white text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner disabled:opacity-50'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <p className='cursor-pointer' onClick={() => navigate("/signup")}>
                        Create a new account? <span className='text-[#FF8C00] font-bold'>Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
