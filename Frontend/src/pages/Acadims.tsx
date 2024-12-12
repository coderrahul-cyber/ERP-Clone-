import { Separator } from "../components/ui/separator";

const Acadims = () => {
  const data = [
    {subject : "R programing"},
    {subjectCode : "TBC303"},
    {faculty : "Mr. Saurab Dhanik "},
    {total : "30"},
    {attended : "15"},
    {percentage : "50%" },
    
    {subject : "Digital Logic Design"},
    {subjectCode : "TBC303"},
    {faculty : "Dr. Jitendra Chaudhary"},
    {total : "34"},
    {attended : "19"},
    {percentage : "55.8%" },
    {subject : "Web Apllication Development(L)"},
    {subjectCode : "PBC302"},
    {faculty : "Akshita Arya"},
    {total : "26"},
    {attended : "22"},
    {percentage : "84.8%" },
    {subject : "Web Apllication Development(s)"},
    {subjectCode : "TBC301"},
    {faculty : "Devendra Singh"},
    {total : "39"},
    {attended : "33"},
    {percentage : "84.62%" },
    {subject : "R programing"},
    {subjectCode : "TBC303"},
    {faculty : "Mr. Saurab Dhanik "},
    {total : "30"},
    {attended : "15"},
    {percentage : "50%" },
    {subject : "Web Apllication Development(L)"},
    {subjectCode : "PBC302"},
    {faculty : "Akshita Arya"},
    {total : "26"},
    {attended : "22"},
    {percentage : "84.8%" },
    
    
  ]
  const percentage :number = 90;
  return (
    <main className="w-[60%] h-screen relative mx-auto mb-4 bg-[#ECD4FD] rounded-[30px] shadowss ">
      <section>
        <div className="w-full flex justify-center items-center gap-2">
          <img src="/assets/icons/Acadims.svg" className="lg:size-24" alt="" />
          <h1 className="font-petrols text-xl">academics</h1>
        </div>
        <Separator className="separate" />
        <div className="px-5  mt-3 mb-5 ">
          <h1 className="font-kenynarg text-2xl">Attendence({percentage}%)</h1>
          <div className="min-h-52 bg-[#D9D9D9] w-full px-5 py-3 rounded-lg mt-2">
             <div className="grid md:grid-cols-[1fr_1fr_1.5fr_1fr_0.5fr_0.5fr]">
              <p className="labelforattend font-semibold text-lg">Subject</p>
              <p className="labelforattend font-semibold text-lg">Subject Code</p>
              <p className="labelforattend font-semibold text-lg">Faculty</p>
              <p className="labelforattend font-semibold text-lg">Total Lectures</p>
              <p className="labelforattend font-semibold text-lg">Attended</p>
              <p className="labelforattend font-semibold text-lg">Percentage</p>
              {data.map((item , index)=>(
                <div key={index} >
                  <p  className="border-x-[1px] border-gray-700/70 text-center text-ellipsis text-nowrap border-collapse"  >{item.subject}</p>
                  <p  className="border-r-[1px] border-gray-700/70 text-center text-ellipsis border-collapse" >{item.subjectCode}</p>
                  <p  className="border-r-[1px] border-gray-700/70 text-center text-ellipsis border-collapse" >{item.faculty}</p>
                  <p  className="border-r-[1px] border-gray-700/70 text-center text-ellipsis border-collapse" >{item.total}</p>
                  <p  className="border-r-[1px] border-gray-700/70 text-center text-ellipsis border-collapse"  >{item.attended}</p>
                  <p className="border-r-[1px] border-b-[1px] border-gray-700/70 text-center border-collapse" >{item.percentage}</p>
                </div>
              ))}
             </div>
          </div>
        </div>
        <Separator className="separate" />
        <div className=" relative px-5 mt-3 mb-5  h-[25dvh] w-full ">
        <h1 className="font-kenynarg text-2xl">Time-Table</h1>
        <div className="w-full h-[80%] flex items-center justify-center text-center ">
           <h1 className="font-semibold font-petrols text-[#363333]">NO CURRENT-DATA</h1>
        </div>
        </div>
        <Separator className="separate" />
        <div className=" relative px-5 mt-3 mb-5  h-[25dvh] w-full ">
        <h1 className="font-kenynarg text-2xl">Feedback</h1>
        <div className="w-full h-[80%] flex items-center justify-center text-center ">
           <h1 className="font-semibold font-petrols text-[#363333]">NO CURRENT-DATA</h1>
        </div>
        </div>
       
      </section>
      
    </main>
  )
}

export default Acadims
