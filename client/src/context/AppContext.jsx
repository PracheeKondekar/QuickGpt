// import { Children, createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {dummyChats, dummyUserData} from "../assets/assets"
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL; 
// const AppContext = createContext()

// export const AppContextProvider = ({ children }) =>{
//     const navigate = useNavigate()
//     const [user, setUser] = useState(null);
//     const [chats, setChats] = useState([]);
//     const [selectedChats, setSelectedChats] = useState(null);
//     const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
//     const [token, setToken] = useState(localStorage.getItem('token') || null);
//     const [loading, setLoading] = useState(true);
//     const fetchUser = async()=>{
//        try{
//        const{data}= await axios.get('/api/users/data',{headers : {Authorization :token}})
//        if(data.success){
//         setUser(data.user)
//        }else{
//             toast.error(data.message)
//        }
//        }catch(error){
//           toast.error(data.message)
//        }finally{
//         setLoading(false)
//        }
//        }

//      const createNewChat = async()=>{
//      try {
//      if(!user)  return toast("Please login to create a new chat")
//      navigate('/')
//      await axios.get('/api/chat/create',{headers : {Authorization :token}})
//     await fetchUsersChats()
//     } catch(error){
//     toast.error(error.message)
//      }
//     }
// }

//     useEffect(()=>{
//         if(theme === 'dark'){
//             document.documentElement.classList.add('dark');
//         }else{
//             document.documentElement.classList.remove('dark'); 
//         }  
//     localStorage.setItem('theme', theme) },[theme])
//     useEffect(()=>{
//           if(user){
//             fetchUsersChats()
//           }
//           else{
//             setChats([])
//             setSelectedChats(null)
//           }
//     },[user])
//     useEffect (()=>{
//         fetchUser()
//     },[])
//     const fetchUsersChats = async()=>{
//        try{

//        }
//        catch(error){

//        }
//     }
//     const value = {
//         navigate,user,setUser,chats,setChats,selectedChats,setSelectedChats,
//         theme,setTheme
//     }
//     return (
//         <AppContext.Provider value={value} >
//             {children}
//         </AppContext.Provider>
//     )

// }
 
//export const useAppContext = ()=> useContext(AppContext)
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChats, setSelectedChats] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loadingUser, setLoadingUser] = useState(true);

    // 🔹 Fetch User
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/data", {
                headers: { Authorization: token },
            });

            if (data.success) {
                setUser(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingUser(false);
        }
    };

    // 🔹 Fetch Chats
    const fetchUsersChats = async () => {
    try {
        const { data } = await axios.get("/api/chat/get", {
            headers: { Authorization: token },
        });

        if (data.success) {
            setChats(data.chats);

            // if the user has no chats
            if (data.chats.length === 0) {
                await createNewChat();
                return fetchUsersChats();
            } else {
                setSelectedChats(data.chats[0]);
            }

        } else {
            toast.error(data.message);
        }

    } catch (error) {
        toast.error(error.message);
    }
};
    // const fetchUsersChats = async () => {
    //     try {
    //         const { data } = await axios.get("/api/chat/get", {
    //             headers: { Authorization: token },
    //         });

    //         if (data.success) {
    //             setChats(data.chats);
    //             //if the user has no chats
    //            if(data.chats.length === 0){
    //             await createNewChat()
    //             return fetchUsersChats()
    //            } else
    //             setSelectedChats(data.chats[0])
    //            }
    //          else {
    //             toast.error(data.message);
    //         }
    //      catch (error) {
    //         toast.error(error.message);
    //      }
    //     }
    // };

    // 🔹 Create New Chat
    const createNewChat = async () => {
        try {
            if (!user) return toast("Please login to create a new chat");

            navigate("/");

            const { data } = await axios.get("/api/chat/create", {
                headers: { Authorization: token },
            });

            if (data.success) {
                await fetchUsersChats();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // 🔹 Theme Effect
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // 🔹 Load Chats when user changes
    useEffect(() => {
        if (user) {
            fetchUsersChats();
        } else {
            setChats([]);
            setSelectedChats(null);
        }
    }, [user]);

    // 🔹 Initial Load
    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setUser(null);
            setLoadingUser(false);
        }
    }, [token]);

    const value = {
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectedChats,
        setSelectedChats,
        theme,
        setTheme,
        createNewChat,
        loadingUser,fetchUsersChats,token
        ,setToken,axios,
        fetchUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// 🔹 Custom Hook
export const useAppContext = () => {
    return useContext(AppContext);
};