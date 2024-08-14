import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if(token){
        return (
            <div className=" flex flex-row justify-end m-2">
                <button onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/")
                }} className=" border-2 p-2 rounded-md mx-1 bg-blue-400 "> Logout </button>
            </div>
        )
    }
    else{
        return (
            <div className=" flex flex-row justify-end m-2">
                <button onClick={()=>{
                    navigate("/signup")
                }} className=" border-2 p-2 rounded-md mx-1 bg-blue-400 "> Signup </button>
    
                <button onClick={()=>{
                    navigate("/signin")
                }} className=" border-2 p-2 rounded-md mx-1 bg-blue-400"> Signin </button>
            </div>
        )
    }
    
}