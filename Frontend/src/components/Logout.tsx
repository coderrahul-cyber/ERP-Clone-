import { LogOutIcon } from "lucide-react"
// import { useUserContext } from "../context/user"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Logout =  () => {
  // const { setToken} = useUserContext();
  const navigate = useNavigate()
  const onClickHandler = async ()=>{
    console.log("clicked");
    const response = await axios.get('http://localhost:3000/api/user/logout', {withCredentials : true})
    if(response.data.success){
      // setToken(null)
      navigate("/sign-in")
      return
    }else{
      toast.error("SOMETHING BROKE")
    }

  }
  return (
    <button  onClick={onClickHandler} className="absolute  cursor-pointer z-50  right-[6%]">
      <LogOutIcon className="size-[1.5vmax]" />
    </button>
  )
}

export default Logout
