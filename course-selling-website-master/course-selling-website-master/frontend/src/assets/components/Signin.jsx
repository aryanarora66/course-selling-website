import Home from "./Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signin(){
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className=" h-screen flex flex-col">
            <Home/>
            <div className=" border-2 rounded-md flex flex-col items-center justify-center  h-full w-full">
                <div className="flex flex-col gap-3 items-center border-2 px-5 py-5 border-gray-500 rounded-md">
                    <input className="border-2 rounded-md px-2" placeholder="username" onChange={(e)=>setUsername(e.target.value)}></ input>

                    <input className="border-2 rounded-md px-2" placeholder="password" onChange={(e)=>setPassword(e.target.value)}></ input>

                    <button className="border py-2 px-10 rounded-md my-4" onClick={async()=>{
                        try{
                            let response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                username, 
                                password  
                            })
                            if(response.status === 200){
                                console.log("logged in successfully")
                                let token = response.data.token.split(" ")[1]
                                localStorage.setItem("token",token)
                                navigate('/');
                            }
                            
                        } 
                        catch(err){
                            console.log(err);
                        }
                    }}>Signin</button>
                </div>
              
            </div>
        </div>
    )
}