import axios from "axios";
import { useEffect, useState } from "react";


export default function Courses(){
    const [loading , setLoading] = useState(true);
    const [courses , setCourses] = useState([]);
    const [error , setError] = useState(null);
    useEffect(()=>{
        const fetchCourses = async() =>{
            const token = localStorage.getItem("token");
            console.log("token :", token)
            if(token){
                try{
                    let response = await axios.get("http://localhost:3000/api/v1/admin/courses",{
                        headers : {
                            token : "Bearer "+token
                        }
                    })
                    console.log("response :" , response)
                    setCourses(response.data.foundCourses)
                }
                catch(err){
                    setError(err)
                }
                finally{
                    setLoading(false);
                }
            } 
            else {
                setLoading(false)
            }
        }
        fetchCourses()
    },[]);

   
    if(loading){
        return (
            <div>
                loading....
            </div>
        )
    }
    else if(error){
        return (
            <div>
                Error : {error}
            </div>
        )
    }
    return (
        <div className="flex flex-row flex-wrap justify-between">
            {
        
                courses.map((course) => (
                    <div className="border rounded-md justify-center">
                        <img className=" overflow-hidden rounded-md " height="340" width="340" src={course.imageLink}/>
                        <div className="">{course.title}</div>
                        <div className="">{course.desc}</div>
                    </div>
                ))

            }
        </div>
    )

}