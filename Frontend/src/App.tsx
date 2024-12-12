/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "./components/SideBar"
import Navbar from "./components/Navbar"
import { useUserContext } from "./context/user";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const { token , setToken } = useUserContext();
  const [data , setData] = useState({})
  const navigate = useNavigate();
  const fetching = async()=>{
    const response = await axios.post(`http://localhost:3000/api/user/fetch`,{}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if(response.data.success){
      setData(response.data.data)
      console.log(data)
    } 
    else if(!response.data.success){
      setData({});
      toast.error("Error ocuured  please login again")
      localStorage.removeItem("token")
      navigate("/sign-in")
    }
  }
  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
    fetching();
  } else if (!token) {
    navigate("/sign-in"); 
  }
  },[token,setToken])

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
