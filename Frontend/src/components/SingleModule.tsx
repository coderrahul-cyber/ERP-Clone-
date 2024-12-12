import { Link } from "react-router-dom"

const SingleModule = ({ name, path , link }: { name: string, path: string , link : string }) => {
  return (
    <Link to={link} className={`  ${name == "placement" ? " h-full flex justify-center   items-center " : "singlemodule group"} `}>
      <div className={`${name == "placement" && "hover:shadow-[-2px_2px_4px_0px] hover:shadow-gray-500/70"} text-center group rounded-xl`}>
        <img src={path} className="lg:size-[140px] mx-5 group-hover:scale-105 group-hover:-rotate-6 transition-all ease-linear duration-200" alt={name} />
        <span className="font-kenynarg text-[30px] text-[#333131] group-hover:text-black">
          {name}
        </span>
      </div>
    </Link>
  )
}

export default SingleModule
