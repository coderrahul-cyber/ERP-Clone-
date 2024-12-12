import RegitserForm from "../components/RegitserForm"
import { ToastContainer} from "react-toastify"

const Register = () => {
  return (
    <main
    style={{
      backgroundImage : `url('/gehuHome.jpg')`,
      backgroundSize:'cover',
      backgroundPosition:'center'
    }}
     className="relative h-screen w-screen  py-2 text-white flex flex-col items-center">
      <div className="md:w-[70%]  lg:w-[50%] register my-auto overflow-scroll pb-10 border-[1px]  rounded-md px-10 glass2 ">
         <div className="flex  gap-2 items-center my-5 justify-center">
        <img src="/assets/image/logo2.webp" className=" size-12" alt="" />
        <h1 className="text-3xl font-petrols">Register As Student</h1>
       </div>
       <RegitserForm/>
       </div>
    </main>
  )
}

export default Register
