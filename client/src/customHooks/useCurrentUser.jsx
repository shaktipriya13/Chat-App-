// now jo current user login ha uska data hum fetch krke hum dal denge apne userData wale state ke andar that we hv made in the redux

// * custom hooks are like helper fxns that we can use again and again

// Goal of This Hook: useCurrentUser
// To fetch the current logged -in user’s details from the backend and store them in Redux, so that your React app knows who is logged in.

// this is a custom hook(fxn) that helps to get current user details

import { useEffect } from "react"; // to perform a task when component mounts
import { serverUrl } from "../main"; // backend URL
import { useDispatch, useSelector } from "react-redux"; // to interact with Redux store
import { setUserData } from "../redux/user.slice"; // Redux action to set user data
import axios from "axios"; // to make HTTP requests (like fetch, but better)


// custom hooks are just like helper fxns that we can use in other components
const useCurrentUser = () => { // ✅ name starts with use — this tells React it’s a hook
    let dispatch = useDispatch(); // dispatch is used to update the user details in user state
    let { userData } = useSelector(state => state.user); // getting current user data from Redux

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // making API call to get current logged-in user
                let result = await axios.get(`${serverUrl}/api/v1/user/current`, {
                    // agar hum /current par request marenge then we will get details of the current user and by using dispatch we will fill in it the current user details

                    withCredentials: true // to send cookies/session with request
                });

                // update Redux state with received user data
                dispatch(setUserData(result.data));
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

export default useCurrentUser;
//* This hook helps you fetch the current user from the backend and save them to Redux so your whole app knows who is logged in.