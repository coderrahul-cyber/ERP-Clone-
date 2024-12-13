/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "./components/SideBar"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import Cookies  from "js-cookie";


function App() {
  const [data , setData] = useState({});
  const navigate = useNavigate();
  const fetching = async()=>{

    try {
      
      const response = await axios.get(`http://localhost:3000/api/user/fetch`,
        {withCredentials:true}
      );
      // console.log(response);
      if(response.data.success){
        setData(response.data.data)
        // console.log(data)
      } 
      else if(!response.data.success){
        console.log(response)
        setData({});
        toast.error("please login again");
        return;
      }
    } catch{
      // console.error('Authorization failed:', error);
      navigate('/sign-in'); 
      
    }

  }
  useEffect(() => {
   fetching()
  }, []);

  return (
    <main className="root-layout">
      <Navbar data={data} />
    <section className="main-section">
    <SideBar data={data} />
    <Outlet />
    </section>
  </main>
  )
}

export default App
