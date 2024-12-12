import { Separator } from "./ui/separator"

const SideBarLogin = () => {
  return (
    <aside className="w-[50%] hidden backdrop-blur-[2px]  lg:flex items-center relative justify-center bg-black/40 rounded-md">

      <article className=" px-5 max-w-[90%]">
       <div className="flex  gap-2 items-center justify-center">
        <img src="/assets/image/logo2.webp" className=" size-12" alt="" />
        <h1 className="text-3xl font-petrols">Student Portal</h1>
       </div>
       <Separator className="border-white border-[1px] my-2" />
       <p className="px-2 text-balance font-medium">
       Welcome to ERP(Student Portal) , a student-friendly platform for managing academics in one place. Access attendance, grades, schedules, and announcements with ease, ensuring you stay organized and focused on your studies.
       </p>


      </article>

    </aside>
  )
}

export default SideBarLogin
