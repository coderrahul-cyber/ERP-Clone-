import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import SideBarLogin from "../components/SideBarLogin";
import Cookies  from "js-cookie";
import { useEffect } from "react";
const SignIn = () =>{

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token cookie exists
    const token = Cookies.get('token'); // Retrieves the 'token' cookie value
    if (token) {
      navigate('/'); // Redirect to home if token is present
    }
  }, [navigate]);
  return(
    <main
    style={{
      backgroundImage : `url('/gehuHome.jpg')`,
      backgroundSize:'cover',
      backgroundPosition:'center'
    }}
     className="signin">
    <SideBarLogin />
    <section className="flex justify-center items-center  h-screen w-screen ">
    <AuthForm />
    </section>
    </main>   
  )
} 
export default SignIn
