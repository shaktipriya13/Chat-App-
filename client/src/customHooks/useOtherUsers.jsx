// custom hook for getting details of other users

// this custom hook will help in getting the data of other users

import { useEffect } from "react"; // to perform a task when component mounts
import { serverUrl } from "../main"; // backend URL
import { useDispatch, useSelector } from "react-redux"; // to interact with Redux store
import { setOtherUsers } from "../redux/user.slice"; // Redux action to set user data
import axios from "axios"; // to make HTTP requests (like fetch, but better)


// custom hooks are just like helper fxns that we can use in other components
const useOtherUsers = () => { // ✅ name starts with use — this tells React it’s a hook
    let dispatch = useDispatch(); // dispatch is used to update the user details in user state
    let { userData } = useSelector(state => state.user); // getting current user data from Redux

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // making API call to get current logged-in user
                let result = await axios.get(`${serverUrl}/api/v1/user/other`, {
                    // agar hum /current par request marenge then we will get details of the current user and by using dispatch we will fill in it the current user details

                    withCredentials: true // to send cookies/session with request
                });

                // update Redux state with received user data
                dispatch(setOtherUsers(result.data));
            } catch (err) {
                // if error occurs during fetch, log it
                console.log(err);
            }
        };

        // run fetch only if userData is not already present
        if (!userData) fetchUser();
        // fetchUser();

    }, [dispatch, userData]); // jab jab userData changes tab each time this useEffect will run
};

export default useOtherUsers;