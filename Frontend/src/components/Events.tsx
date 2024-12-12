import { Separator } from "@radix-ui/react-separator"
import Campus from "./Campus"

const Events = () => {
    const data =[
        {
          "name": "Graphic Era Hill University",
          "campus":"Dehradun Campus",
          "description": "The main campus of Graphic Era Hill University, located in the serene hills of Dehradun, known for its state-of-the-art infrastructure and diverse programs.",
          "path" :"/assets/image/dehra.webp",
          "link" :"/events/Dehradun",
        },
        {
          "name": "Graphic Era Hill University",
          "campus":"Bhimtal Campus",
          "description": "Located near the picturesque Bhimtal Lake, this campus offers a peaceful learning environment with a focus on industry-oriented programs.",
          "path" :"/assets/image/bhimtal.webp",
          "link" :"/events/Bhimtal",
        },
        {
          "name": "Graphic Era Hill University",
          "campus":"Haldwani Campus",
          "description": "The Haldwani campus caters to students from Kumaon and nearby areas, with a focus on skill development and academic excellence, helping youngster to make it big",
          "path" :"/assets/image/hal.webp",
          "link" :"/events/Haldwani",
        }
      ]
      

  return (
    <section className="events">
        <h1 className="heading1">CURRENT EVENTS</h1>
        <Separator className="bg-gray-500/70 w-full h-[1px]" />
        <div className="campus">
           {data.map((item,index)=>(
            <Campus key={index} data={item} />
           ))}
        </div>

      
    </section>
  )
}

export default Events
