import SingleModule from "./SingleModule"
import { Separator } from "./ui/separator"



const Modules = () => {
    const data =[
        {name: "academics", path: "http://localhost:5173/assets/icons/Acadims.svg" , link:"/acadims"},
        {name: "exam", path: "http://localhost:5173/assets/icons/Exam.svg" , link : "/exam"},
        {name: "circular", path: "http://localhost:5173/assets/icons/circ.svg" , link : "/circular"},
        {name: "fees", path: "http://localhost:5173/assets/icons/fees.svg" , link:"/fees"},
        {name: "complain", path: "http://localhost:5173/assets/icons/complain.svg" , link : "/complain"},
        {name: "placement", path: "http://localhost:5173/assets/icons/Placement.svg" , link:"/placement"}
        ]
    return (
        <div className="module">
            <h1 className="heading1">Modules</h1>
            <Separator className="bg-gray-500/70 " />
            <div className="relative w-full h-[80%] flex  overflow-hidden  ">
            <section className=" w-1/2 px-6 py-2 flex flex-wrap justify-center gap-5 ">
                {data.filter((vale) => vale.name !== "placement").map((item, index) => (
                    <SingleModule key={index} name={item.name} path={item.path} link={item.link} />
                ))}
            </section>
            <div className="border-l-2 border-black w-1 h-full"></div>
            <section className="place w-1/2">
                {data.filter((val)=> val.name === "placement").map((item , index)=>(
                    <SingleModule key={index} name={item.name} path={item.path} link={item.link} />
                ))}
        </section>
            </div>
        </div>
    )
}

export default Modules
