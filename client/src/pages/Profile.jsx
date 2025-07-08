// import React, { useRef, useState } from 'react';
// import dp from "../assets/dp.webp";
// import { IoCameraOutline } from "react-icons/io5";
// import { useDispatch, useSelector } from 'react-redux';
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { serverUrl } from '../main';
// import { setUserData } from '../redux/userSlice';

// function Profile() {
//     let { userData } = useSelector(state => state.user);
//     let dispatch = useDispatch();
//     let navigate = useNavigate();
//     let [name, setName] = useState(userData.name || "");
//     let [frontendImage, setFrontendImage] = useState(userData.image || dp);
//     let [backendImage, setBackendImage] = useState(null);
//     let image = useRef();
//     let [saving, setSaving] = useState(false);

//     const handleImage = (e) => {
//         let file = e.target.files[0];
//         setBackendImage(file);
//         setFrontendImage(URL.createObjectURL(file));
//     };

//     const handleProfile = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             let formData = new FormData();
//             formData.append("name", name);
//             if (backendImage) {
//                 formData.append("image", backendImage);
//             }
//             let result = await axios.put(`${serverUrl}/api/user/profile`, formData, { withCredentials: true });
//             setSaving(false);
//             dispatch(setUserData(result.data));
//             navigate("/");
//         } catch (error) {
//             console.log(error);
//             setSaving(false);
//         }
//     };

//     return (
//         <div className='w-full h-[100vh] bg-[#FFE5B4] flex flex-col justify-center items-center gap-[20px]'>
//             <div className='fixed top-[20px] left-[20px] cursor-pointer' onClick={() => navigate("/")}>
//                 <IoIosArrowRoundBack className='w-[50px] h-[50px] text-[#FF8C00]' />
//             </div>
//             <div
//                 className='bg-white rounded-full border-4 border-[#FF8C00] shadow-lg relative cursor-pointer'
//                 onClick={() => image.current.click()}
//             >
//                 <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center'>
//                     <img src={frontendImage} alt="" className='h-full' />
//                 </div>
//                 <div className='absolute bottom-4 right-4 w-[35px] h-[35px] rounded-full bg-[#FFA500] flex justify-center items-center shadow-lg'>
//                     <IoCameraOutline className='text-white w-[25px] h-[25px]' />
//                 </div>
//             </div>

//             <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center' onSubmit={handleProfile}>
//                 <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />

//                 <input
//                     type="text"
//                     placeholder="Enter your name"
//                     className='w-[90%] h-[50px] outline-none border-2 border-[#FFA500] px-[20px] py-[10px] bg-white rounded-lg shadow-md text-gray-700 text-[19px]'
//                     onChange={(e) => setName(e.target.value)}
//                     value={name}
//                 />

//                 <input
//                     type="text"
//                     readOnly
//                     className='w-[90%] h-[50px] outline-none border-2 border-[#FFA500] px-[20px] py-[10px] bg-[#FFDAB9] rounded-lg shadow-md text-gray-600 text-[19px]'
//                     value={userData?.userName}
//                 />

//                 <input
//                     type="email"
//                     readOnly
//                     className='w-[90%] h-[50px] outline-none border-2 border-[#FFA500] px-[20px] py-[10px] bg-[#FFDAB9] rounded-lg shadow-md text-gray-600 text-[19px]'
//                     value={userData?.email}
//                 />

//                 <button
//                     className='px-[20px] py-[10px] bg-[#FF8C00] hover:bg-[#FF7F50] text-white rounded-2xl shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold transition-all duration-200'
//                     disabled={saving}
//                 >
//                     {saving ? "Saving..." : "Save Profile"}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Profile;
