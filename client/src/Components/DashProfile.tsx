import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";

function DashProfile() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<number | null>(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<string | null>(null)
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
 const filePickerRef = useRef<HTMLInputElement>(null)

 console.log(imageFileUploadProgress, imageFileUploadError) 
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
  if (file) {
    setImageFile(file);
    setImageURL(URL.createObjectURL(file));
  }
}

useEffect(()=>{
  if (imageFile){
    uploadImage()
  }
},[imageFile])

const uploadImage = async () => {
 const storage = getStorage(app);
 const fileName =   imageFile?.name;
 const storageRef = ref(storage, fileName);
 const uploadTask = uploadBytesResumable(storageRef, imageURL);
 uploadTask.on(
    "state_changed", (snapshot) => {
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     setImageFileUploadProgress(progress);
     ;
   },
   (error) => {
     setImageFileUploadError('could not upload image');
   },
   () => {
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
      setImageURL(downloadURL)
     }
    )
   }
  )
}
  return (
    <div className="max-auto p-3 w-full">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4 max-w-xl mx-auto">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="w-36 h-36 overflow-hidden rounded-full shadow-md self-center"
          onClick={() => filePickerRef.current?.click()}
        >
          <img
            src={imageURL|| currentUser.profilePicture || "User Profile Picture"}
            alt="User"
            className="rounded-full  border-8 border-[lightgray] w-full h-full object-cover"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          value={currentUser.username || "User Name"}
        />
         <TextInput
          type="email"
          id="email"
          placeholder="Email"
          value={currentUser.email || 'User Email'}
        />
         <TextInput
          type="password"
          id="password"
          placeholder="Password"
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex mt-5 justify-between text-red-500 max-w-xl mx-auto">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
