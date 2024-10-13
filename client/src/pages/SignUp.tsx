import axios, {AxiosResponse } from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FormDataType {
  username: string;
  email: string;
  password: string;
}

interface signUpResponseType{
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
  }
}

function singUp() {
  const [fromData, setFormData] = useState<FormDataType>({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...fromData, [e.target.id]: e.target.value })
  }
const submitHandler = async (e: React.FormEvent<HTMLFormElement>):Promise<void>=> {
   e.preventDefault()
  try {
   const res: AxiosResponse<signUpResponseType> = await axios.post('/api/auth/signup', fromData, {
    headers: { "Content-Type": "application/json" }
   })
   console.log(res.data)
  }
  catch (error) {
    console.log(error)
  }
}

  return (
    <div className="mt-20 min-h-screen ">
      <div className=" p-3 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center gap-4 ">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sahand's
            </span>
            Blogs
          </Link>
          <p className="text-sm mt-5">
            this is a demo project, you can sign up with your email and passowrd
            or Google account
          </p>
        </div>
        <div className=" flex-1">
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput id="username" type="text" placeholder="Username" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput id="email" type="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput id="password" type="password" placeholder="Password" onChange={handleChange}  />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">Sign Up</Button>
          </form>
          <div className="mt-5 flex gap-4 text-sm ">
            <span > have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500 ">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default singUp;
