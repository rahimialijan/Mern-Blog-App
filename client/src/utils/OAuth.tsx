import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import axios from "axios";

function OAuth() {
  const handleWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.getCustomParameters();
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = resultsFromGoogle.user;
      const formData = {
        username: displayName,
        email: email,
        photo: photoURL,
      };
      console.log(resultsFromGoogle);
      const response = await axios.post("/api/auth/google", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data>=200 && response.data<300) {
        console.log("success");
      } 
    } catch (error) {
      console.log(error);
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
