import AuthForm from "../components/AuthForm";
import SideBarLogin from "../components/SideBarLogin";
const SignIn = () =>{

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
