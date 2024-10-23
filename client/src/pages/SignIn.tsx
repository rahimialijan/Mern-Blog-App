import axios, { AxiosResponse } from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BrandLink from "../utils/BrandLink";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/auth/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import OAuth from "../utils/OAuth";

interface FormDataType {
  email: string;
  password: string;
}

interface signUpResponseType {
  message: string;
  success: boolean;
  user?: {
    id: string;
    username: string;
    email: string;
    profilePicture:string
  };
}

function SignIn() {
  const [fromData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });
 
  const {loading, error: errorMessage } = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...fromData, [e.target.id]: e.target.value.trim() });
  };
  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!fromData.email || !fromData.password) {
      dispatch(loginFailure("Please fill in all fields"))
      return
    }
    try {
       dispatch(loginStart())
      const res: AxiosResponse<signUpResponseType> = await axios.post(
        "/api/auth/signin",
        fromData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        dispatch(loginSuccess(res.data))
        navigate("/");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        dispatch(loginFailure((error.response.data as { message: string }).message));
      } else {
        dispatch(loginFailure("An unexpected error occurred."));
      }
    }
  };

  return (
    <div className="mt-20 min-h-screen ">
      <div className=" p-3 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center gap-4 ">
        <div className="flex-1">
          <BrandLink className="text-4xl" />
          <p className="text-sm mt-5">
            this is a demo project, you can sign in with your email and passowrd
            or Google account
          </p>
        </div>
        <div className=" flex-1">
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">loading..</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="mt-5 flex gap-4 text-sm ">
            <span> Dont have an account?</span>
            <Link to={"/sign-up"} className="text-blue-500 ">
              Sign Up
            </Link>
          </div>
          <div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
