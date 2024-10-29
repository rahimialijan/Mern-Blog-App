import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, TextInput } from "flowbite-react";

function DashProfile() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className="max-auto p-3 w-full">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4 max-w-xl mx-auto">
        <div className="w-36 h-36 overflow-hidden rounded-full shadow-md self-center">
          <img
            src={currentUser.profilePicture || "User Profile Picture"}
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
