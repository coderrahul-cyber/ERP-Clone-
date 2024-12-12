import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

interface Props{
  data:{

    name :string ,
    campus : string,
    description : string ,
    path : string,
    link: string,
  }
}

const Campus = ({data} : Props) => {
  const {name , description ,path , campus , link} = data;
  return (
    <Link to={link} className=" group max-w-[40%]  h-[90%] relative bg-neutral-600 rounded-[20px]  overflow-hidden  ">
      <img src={path} className="w-full h-full transition-all ease-linear duration-200 group-hover:blur-[2px] group-hover:opacity-75   object-cover object-center" alt="" />
      <div className=" absolute  -bottom-[70px] px-2  group-hover:bottom-10 duration-200  ">
        <h1 className="font-petrols lg:text-[36px] pt-4">
          {name}
          </h1>
          <Separator className="bg-gray-500/70 w-full h-[1px]" />
          <span className="block font-semibold ">({campus})</span>
          <div className="font-serif line-clamp-3">
            {description}
          </div>
          </div>
    </Link>
  )
}
export default Campus
