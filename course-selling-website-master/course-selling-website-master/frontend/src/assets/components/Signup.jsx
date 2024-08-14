import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

export default function Signup(){
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    return (
        <div className=" h-screen flex flex-col">
            <Navbar/>
            <div className=" border-2 rounded-md flex flex-col items-center justify-center  h-full w-full">
                <div className="flex flex-col gap-3 items-center border-2 px-5 py-5 border-gray-500 rounded-md">
                    <input className="border-2 rounded-md px-2" placeholder="username" onChange={(e)=>setUsername(e.target.value)}></ input>

                    <input className="border-2 rounded-md px-2" placeholder="password" onChange={(e)=>setPassword(e.target.value)}></ input>

                    <button className="border py-2 px-10 rounded-md my-4" onClick={async()=>{
                        try{
                            let response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username, 
                                password  // don't need application header here as axios send it by default   
                            })
                            console.log(response)
                        } 
                        catch(err){
                            console.log(err);
                        }
                    }}>Signup</button>
                </div>
              
            </div>
        </div>
    )
}