import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../components/ui/textarea"
import { Separator } from "../components/ui/separator"

const formSchema =z.object({
 userId : z.string().min(5),
 name : z.string().min(5).max(20),
 email:z.string().email(),
 complain : z.string().max(255)
}) 

const Complain = () => {
  const [isLoading , setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema >>({
    resolver : zodResolver(formSchema) , 
    defaultValues : {
      userId : "",
      name : "",
      email:"",
      complain : "Dear sir,"
    }
  })
  const onSubmit= (value : z.infer<typeof formSchema>)=>{
    setLoading(true);
    console.log(value)
  }
  return (
    <Form  {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-[#fff5998f] relative w-[50%] min-h-[50%] h-max  px-10 py-5 mx-auto rounded-[30px] shadowss border-[1px] border-white">
      <div className="flex items-center">
      <img src="/assets/image/logo.webp" className='size-20 ' alt="" />
      <h1 className='font-kenynarg text-2xl'>PLEASE TELLS US YOUR COMPLAIN </h1>
      </div>
      <Separator className="bg-gray-500/70 " />

      <FormField 
        control={form.control}
        name="userId"
        render={({ field }) => (
          <FormItem>
            <div className="flex my-2 items-center gap-4">
            <FormLabel className='text-sm font-semibold '>USERID</FormLabel>
            <FormControl>
              <Input className='w-full  glass placeholder:text-gray-700' required placeholder="Your UserId" {...field} />
            </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <div className="flex my-2 items-center gap-6">
            <FormLabel className="text-sm font-semibold">NAME</FormLabel>
            <FormControl>
              <Input className="w-full placeholder:text-gray-700 glass " placeholder="Your Name" {...field} />
            </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <div className="flex my-2 items-center gap-7">
            <FormLabel className="text-sm font-semibold">Email</FormLabel>
            <FormControl>
              <Input className="w-full placeholder:text-gray-700 glass " placeholder="Your Email" {...field} />
            </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="complain"
        render={({ field }) => (
          <FormItem>
            <div className="flex my-2 items-center gap-1">
            <FormLabel className="text-sm font-semibold">Complain</FormLabel>
            <FormControl>
              <Textarea className="w-full text-gray-800 glass placeholder:text-black resize-none focus:outline-[1px] outline-white" placeholder="Type the text here" {...field} />
            </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="w-full flex justify-center gap-2">
      <Button className='w-1/2 bg-blue-500/70 text-white hover:text-black mt-5' type="submit">
        {isLoading ? <img src="/assets/icons/loader.svg" className='size-5'/> : 'SEND'}
        </Button>
      </div>
      <footer className="w-full text-center capitalize italic text-sm mt-2 ">
       "Be Caution While Complaining"
      </footer>
    </form>
  </Form>      
  )
}

export default Complain
