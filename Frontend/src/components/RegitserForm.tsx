import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from './ui/button'
import { z } from "zod"
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  DOB: z.string().refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date" }),
  image: z.instanceof(File).optional() ,
  branch: z
    .string()
    .min(1, { message: "Branch is required" }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  course: z
    .string()
    .min(1, { message: "Course is required" }),
})



const RegitserForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      DOB: "",
      image:"",
      phone: "",
      course: "BCA",
      branch: "Not Applicable",
    },
  });

  const [branch, setBarnch] = useState<boolean>(true);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setIsLoading(true);
      const formattedDOB = new Date(values.DOB);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("DOB", formattedDOB.toISOString());
      if (values.image) formData.append("image", values.image);
      formData.append("phone", values.phone);
      formData.append("course", values.course);
      formData.append("branch", values.branch);


      const response = await axios.post("http://localhost:3000/api/user/create", formData)
      if (response.data.success) {
        toast.success("User created please check your email")
        navigate("/sign-in")
      } else {
        setError(response.data.message);
      }
    } catch {
      setError("Error Ocuured please try again later!");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  ">
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='formItem2'>
              <FormLabel className='formlabel2'>Name :</FormLabel>
              <FormControl>
                <Input className='inputsr ' {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='formItem2'>
              <FormLabel className='formlabel2'>Email :</FormLabel>
              <FormControl>
                <Input className='inputsr' type="email" {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='formItem2 relative'>
              <FormLabel className='formlabel2'>Password :</FormLabel>
              <FormControl>
                <>
                  <Input className='inputsr'
                    {...field}
                    type={passwordType}
                    placeholder="Enter your password"
                  />
                  {passwordType === "password" ? (
                    <EyeOff
                      onClick={() => setPasswordType("text")}
                      className="absolute lg:right-[38%] top-2 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setPasswordType("password")}
                      className="absolute lg:right-[38%] top-2 cursor-pointer"
                    />
                  )}
                </>

              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="DOB"
          render={({ field }) => (
            <FormItem className='formItem2'>
              <FormLabel className='formlabel2'>Date of Birth:</FormLabel>
              <FormControl>
                <Input className='inputsr' {...field} type="date" />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className='formItem2'>
              <p className='font-semibold formlabel2'>Upload your Photo :</p>
              <FormLabel>
                <img className='w-[4vmax] h-[4vmax]  object-cover object-center overflow-hidden' src={previewURL ? previewURL : "/assets/image/upload.png"} alt="" />
              </FormLabel>
              <FormControl>
                <input
                  type="file" hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const fileURL = URL.createObjectURL(file);
                      setPreviewURL(fileURL);
                    }
                    field.onChange(file);
                  }}
                  accept="image/*"
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className='formItem2'>
              <FormLabel className='formlabel2'>Phone :</FormLabel>
              <FormControl>
                <Input className='inputsr' {...field} placeholder="Enter your phone number" />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* Course */}
       

       <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className='formItem2'>
              <FormLabel className='formlabel2'>Course :</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setBarnch(e.target.value !== "B.Tech"); 
                  }}
                  required
                  className="text-sm text-black mx-2 bg-white/20 rounded-md px-2 py-1"
                >
                  <option value="BCA">BCA</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="BBA">BBA</option>
                  <option value="B.Pharm">B.Pharm</option>
                </select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Branch */}
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem className='formItem2'>
              <FormLabel className='formlabel2'>Branch :</FormLabel>
              <FormControl>
                <select   {...field} disabled={branch}   className="text-sm disabled:cursor-not-allowed text-black mx-2 bg-white/20 rounded-md px-2 py-1">
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Civil">Civil</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="bg-blue-500 hover:bg-blue-600 w-28" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegitserForm
