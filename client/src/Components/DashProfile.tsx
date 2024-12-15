import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";
import { updateStart, updateSuccess, updateFailure } from "../redux/auth/userSlice";
import { useDispatch } from "react-redux";

interface FormDataProps {
  username: string;
  email: string;
  password?: string;
  profilePicture?:string
}

function DashProfile() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<number | null>(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<string | null>(null)
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [updateFailureMessage, setUpdateFailureMessage] = useState<string | null>(null)
const [updateUserSucess, setUpdateUserSucess] = useState<string | null>(null)
  console.log('current user id',currentUser._id)
 const filePickerRef = useRef<HTMLInputElement>(null)
 const [formData, setFormData] = useState<FormDataProps>({
  username: currentUser.username || '',
  email: currentUser.email || '',
  profilePicture: currentUser.profilePicture || '', 
  password: ''
 });
const dispatch = useDispatch()
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

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({...formData, [e.target.id]: e.target.value})
}
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(formData);
  if (
    formData.username === currentUser.username &&
    formData.email === currentUser.email &&
    (!formData.password || formData.password === "") &&
    formData.profilePicture === currentUser.profilePicture
  ) {
    setUpdateFailureMessage('No changes made');
    setUpdateUserSucess(null)
    return;
  }
  try {
    dispatch(updateStart());
    const response = await fetch(`http://localhost:5173/api/user/update/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Await the parsed JSON response
    const data = await response.json();

    if (response.ok) {
      dispatch(updateSuccess(data));
      setUpdateUserSucess('User updated successfully')
      setUpdateFailureMessage(null)
    } else {
      dispatch(updateFailure(data.message));
      setUpdateFailureMessage(data.message)
      setUpdateUserSucess(null)
    }
  } catch (error) {
    dispatch(updateFailure(error as string));
    setUpdateFailureMessage(error as string)
    setUpdateUserSucess(null)
  }
};


  return (
    <div className="max-auto p-3 w-full">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="w-36 h-36 overflow-hidden rounded-full shadow-md self-center"
          onClick={() => filePickerRef.current?.click()}
        >
          <img
            src={imageURL|| currentUser.profilePicture || "User Profile Picture"}
            alt="User"
            className="rounded-full  border-8 border-[lightgray] w-full h-full object-cover"
            onChange={handleChange}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username || "User Name"}
          onChange={handleChange}
        />
         <TextInput
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email || 'User Email'}
          onChange={handleChange}
        />
         <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      
      </form>
      <div className="flex mt-5 justify-between text-red-500 max-w-xl mx-auto">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSucess && <Alert color="success" className="text-green-500 text-center mt-5">{updateUserSucess}</Alert>}
      {updateFailureMessage && <Alert color="failure" className="text-red-500 text-center mt-5">{updateFailureMessage}</Alert>}
    </div>
  );
}

export default DashProfile;
