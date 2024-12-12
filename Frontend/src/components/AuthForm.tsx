/* eslint-disable react-hooks/exhaustive-deps */

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUserContext } from '../context/user'

const formSchema = z.object({
  userId: z.string().min(5),
  password: z.string().min(8)
})


const AuthForm = () => {
  const { token, setToken } = useUserContext();
  const navigate = useNavigate();
 
  const [password, setPassword] = useState('password');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: ""
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const formData = {
        userId: values.userId,
        password: values.password,
      };
      console.log("Form data is sent " , formData )
  
      const response = await axios.post(
        `http://localhost:3000/api/user/login`, 
        formData
      );
    // console.log(response)
      if (response.data.success) {
        setToken(response.data.token); 
        if(localStorage.getItem("token")) localStorage.clear()
        localStorage.setItem("token", response.data.token);
        navigate(`/`); 
      } else {
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to login. Please check your credentials or try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && token !== null) {
      navigate('/')
    }
  }, [])
  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="forms">
        <img src="/assets/image/logo.webp" className='size-20 mx-auto' alt="" />
        <h1 className='form-title'> GRAPHIC ERA HILL UNVIRSITY</h1>
        {error && <p className='text-center text-red-400 text-sm'>{error}</p>}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <div className="formItem">
                <FormLabel className='mb-2'>USERID</FormLabel>
                <FormControl>
                  <Input className='inputs' required placeholder="userId" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="formItem">
                <FormLabel>PASSWORD</FormLabel>
              </div>
              <FormControl>
                <div className="formItem relative">
                  <Input className='inputs' type={password} required placeholder="password" {...field} />
                  {password == 'password' ?
                    <EyeOff onClick={() => setPassword('')} className='eye' />
                    : <Eye onClick={() => setPassword('password')} className='eye' />
                  }
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="formItem">
          <Button className='sign-btn' type="submit">
            {isLoading ? <img src="/assets/icons/loader.svg" className='size-5' /> : 'Login'}
          </Button>
        </div>
        <footer className="form-footer">
          <Link to='/register'>
            Register As student
          </Link>
        </footer>
      </form>
    </Form>
  )
}

export default AuthForm
