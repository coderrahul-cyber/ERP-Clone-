import axios from 'axios'
import SingleDetail from "./SingleDetail"
import { Suspense, useCallback, useEffect, useState } from 'react';
interface Data {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
const SideBar = ({data} : Data ) => {
  const [quote , setQuote] = useState("");
  // const data: Data = {
  //   "Unvirsity-Id": 230411353,
  //   "name": "Rahul Samant",
  //   "course": "BCA",
  //   "image": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   "branch": "Not/Applicable",
  //   "Current Sem": 3 + "rd Sem",
  //   "D.O.B": "1/2/2006",
  //   "Phone No": 7345173834,
  //   "Email": "xyz@gmailcom",
  //   "College-Email": "dasg@gehu.ac"
  // }



  const RandomQuotes=  useCallback(async()=>{
    try {
     const response = await axios.get('https://quoteslate.vercel.app/api/quotes/random');
     if(response.data.length > 60){
        return RandomQuotes();  
     }
     setQuote(response.data.quote)
    } catch {
     setQuote("Unable to get quote")
    }
  },[setQuote]) 
  

  useEffect(()=>{

   
    RandomQuotes();

    return ()=> setQuote("")
    

  } ,[RandomQuotes])
  

  return (
    <aside className="sidebar">
      <article className="info">
        <section className="  bg-red-500 size-32 group  rounded-full  flex flex-col items-center overflow-hidden">
          <Suspense fallback={<p>Loading....</p>}>

          <img src={data.image} className=" object-cover object-center group-hover:scale-105 transition-allrounded-full  ease-linear duration-150  " alt="" />
          </Suspense>
        </section>
        <h1 className="lg:text-[32px] w-full text-center font-petrols border-b-[0.9px]   border-gray-500/70 ">{data.name}</h1>
        <section className="detail">
          {data &&
            Object.entries(data)
              .filter(([key]) => key !== "image"  && key !== "name" && key!== "_id")
              .map(([key, value]) => (
                <SingleDetail key={key} keyy={key} value={value} />
              ))}
        </section>

        <section className=" mt-2 italic text-sm px-5 line-clamp-3 text-center">
       "{quote}"
        </section>

      </article>
      <footer className="socialfooter">
        <img className='hover:scale-105 transition1' src="/assets/icons/Social.svg" alt="" />
        <div className=" w-1/2 flex justify-center pl-5 gap-5 ">
          <a href="https://www.instagram.com/graphicerahilluniversity/" className='hover:scale-105 transition1' target="#"><img src="/assets/icons/Instagram,.svg" alt="" /></a>
          <a href="https://www.facebook.com/gehu.official/" className='hover:scale-105 transition1' target="#"><img src="/assets/icons/fb.svg" alt="" /></a>
          <a href="https://in.linkedin.com/school/graphicerahilluniversity/" className='hover:scale-105 transition1' target="#"><img src="/assets/icons/LinkedInsvg.svg" alt="" /></a>
        </div>
      </footer>
    </aside>
  )
}

export default SideBar
