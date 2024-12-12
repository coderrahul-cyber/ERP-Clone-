import { useParams } from "react-router-dom"
import { Separator } from "../components/ui/separator";

const CampusEvent = () => {
  const { campus } = useParams();
  const data = [
    {
      "event_name": "Tech Innovators Fest",
      "description": "A two-day technology fest showcasing innovative projects, hackathons, and expert talks by industry leaders.",
      "date": "2024-12-15",
      "time": "10:00 AM - 5:00 PM",
      "campus": "Graphic Era Hill University, Dehradun",
      "venue": "Auditorium Hall A",

      "organizers": ["Computer Science Department", "Robotics Club"],
      "participants": "Open to all students",
      "registration_fee": 300,
      "contact": {
        "email": "techfest@gehu.edu.in",
        "phone": "+91 9876543210"
      }
    },
    {
      "event_name": "Cultural Carnival",
      "description": "An exciting carnival featuring dance, music, drama, and various cultural performances by students.",
      "date": "2024-12-20",
      "time": "3:00 PM - 8:00 PM",
      "campus": "Graphic Era Hill University, Bhimtal",
      "venue": "Open-Air Theatre"
      ,
      "organizers": ["Cultural Committee", "Drama Club"],
      "participants": "Students and faculty members",
      "registration_fee": 150,
      "contact": {
        "email": "culture@gehu.edu.in",
        "phone": "+91 9988776655"
      }
    },
    {
      "event_name": "Annual Sports Meet",
      "description": "A week-long event with inter-departmental competitions in cricket, football, basketball, and athletics.",
      "date": "2024-12-10",
      "time": "9:00 AM - 6:00 PM",
      "campus": "Graphic Era Hill University, Haldwani",
      "venue": "Sports Ground",
      "organizers": ["Sports Committee"],
      "participants": "All students and staff",
      "registration_fee": "Free",
      "contact": {
        "email": "sportsmeet@gehu.edu.in",
        "phone": "+91 1122334455"
      }
    },
    {
      "event_name": "Entrepreneurship Workshop",
      "description": "A hands-on workshop to inspire and train students on starting their entrepreneurial journey.",
      "date": "2024-12-18",
      "time": "11:00 AM - 4:00 PM",
      "campus": "Graphic Era Hill University, Dehradun",
      "venue": "Conference Room 2",
      "organizers": ["Business Management Department", "Startup Incubation Center"],
      "participants": "Final-year students",
      "registration_fee": 500,
      "contact": {
        "email": "entrepreneurship@gehu.edu.in",
        "phone": "+91 8899776655"
      }
    },
    {
      "event_name": "Environmental Awareness Drive",
      "description": "A community event to raise awareness about environmental issues with workshops and plantation drives.",
      "date": "2024-12-22",
      "time": "8:00 AM - 1:00 PM",
      "campus": "Graphic Era Hill University, Bhimtal",
      "venue": "Main Lawn",
      "organizers": ["Eco Club"],
      "participants": "All students, faculty, and local residents",
      "registration_fee": "Free",
      "contact": {
        "email": "eco@gehu.edu.in",
        "phone": "+91 7766554433"
      }
    }
  ]

  const imageSelctor = () => {
    const images = {
      "bhimtal": "/assets/image/bhimtal.webp",
      "dehra": "/assets/image/dehra.webp",
      "hal": "/assets/image/hal.webp",
    }

    return campus == "Bhimtal" ? images.bhimtal : campus == "Dehradun" ? images.dehra : images.hal
  }

  return (
    <div className="w-[60%] h-full   relative mx-auto overflow-hidden rounded-[30px] bg-black">
      <img src={imageSelctor()} className="w-full h-full transition-all ease-linear duration-200 blur-[2px] opacity-75   object-cover object-center" alt={campus} />
      <div className="absolute w-full z-20 top-10 text-white px-10">

        <h1 className="font-petrols text-[5dvh]">{campus}<span className="text-gray-300 mx-1 text-lg">Campus...</span></h1>
        <Separator className="bg-gray-300 my-1" />
        <div className="w-full h-full flex flex-wrap gap-5 px-10 py-5">
          {data
            .filter((item) => item.campus.includes(campus))
            .map((item, index) => (
              <div className="min-h-40 w-64 relative bg-white/50 text-black hover:shadowss rounded-xl px-5 py-5 select-none transition-all ease-linear duration-150 hover:border-[1px] border-white hover:scale-105 active:scale-95 active:rotate-6 " key={index}>
                <h1 className="text-xl text-gray-800  tracking-wider font-kenynarg">{item.event_name}...</h1>
                <Separator className="bg-gray-700/75 mb-2" />
                <p className="text-sm">{item.description.slice(0,60)}...</p>
                 <h3 className="font-semibold">Organizers</h3>
                <Separator className="bg-gray-700/75 mb-2" />
                 {item.organizers.map((item,index)=>(
                   <ul className="px-2" key={index}>
                    <li className="list-disc text-xs">{item}</li>
                  </ul>
                 ))}
                 <Separator className="bg-gray-700/75 mb-2" />
                 <div className="text-sm italic font-mono">"Venue: {item.venue} <br/> Date: {item.date}"</div>
                 <Separator className="bg-gray-700/75 mb-1" />
                 <p className="mt-2 font-semibold ">FOR : <span className="text-sm ">{item.participants}</span></p>
                 <footer className="flex flex-col text-xs rounded-md  mt-2 border-[1px] border-gray-700/70 text-center" >
                  <span>Email:{item.contact.email}</span>
                  <span>Contact{item.contact.phone}</span>
                  </footer>
              </div>
            ))}

        </div>


      </div>
    </div>
  )
}

export default CampusEvent
