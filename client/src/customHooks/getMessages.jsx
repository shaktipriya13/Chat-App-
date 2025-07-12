import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/user.slice.js"
import { setMessages } from "../redux/message.slice.js"

const getMessage = () => {
    let dispatch = useDispatch()
    let { userData, selectedUser } = useSelector(state => state.user)
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, { withCredentials: true })
                dispatch(setMessages(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages()
    }, [selectedUser, userData])
}

export default getMessage