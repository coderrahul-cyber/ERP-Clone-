import { LogOutIcon } from "lucide-react"
import { useUserContext } from "../context/user"
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setToken} = useUserContext();
  const navigate = useNavigate()
  const onClickHandler = ()=>{
    console.log("clicked")
    localStorage.removeItem("token")
    setToken(null)
    navigate("/sign-in")

  }
  return (
    <button  onClick={onClickHandler} className="absolute  cursor-pointer z-50  right-[6%]">
      <LogOutIcon className="size-[1.5vmax]" />
    </button>
  )
}

export default Logout
