import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth/userSlice";
import { useNavigate } from "react-router-dom";

interface signUpResponseType {
  message: string;
  success: boolean;
  user?: {
    id: string;
    username: string;
    email: string;
    profilePicture: string | null;
  };
}

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.getCustomParameters();
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // const { displayName, email, photoURL } = resultsFromGoogle.user;
      // const formData = {
      //   username: displayName,
      //   email: email,
      //   profilePicture: photoURL,
      // };
      const userData = {
        id: resultsFromGoogle.user.uid,
        email: resultsFromGoogle.user.email,
        username: resultsFromGoogle.user.displayName,
        profilePicture: resultsFromGoogle.user.photoURL,
      };
      console.log("Form Data:", userData);
      const response: AxiosResponse<signUpResponseType> = await axios.post(
        "/api/auth/google",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        dispatch(loginSuccess(response.data));
        navigate("/");
      }
    } catch (error) {
      console.log("error for catch block", error);
    }
  };
  return (
    <Button gradientDuoTone="pinkToOrange" outline onClick={handleWithGoogle}>
      <AiFillGoogleCircle className="w-6 h-6 mr-4" />
      Continue with Google
    </Button>
  );
}

export default OAuth;
