import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import BrandLink from "../utils/BrandLink";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setTheme } from "../redux/theme/themeSlice";



function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const isUserloggedIn = currentUser && currentUser.username && currentUser.email;

  console.log('profile picture', currentUser.profilePicture);
  console.log('currentUser', currentUser)
  return (
    <Navbar className="border-b-2">
      <BrandLink className="text-sm sm:text-xl font-semibold" />
      <form>
        <TextInput
          type="text"
          placeholder="Search.."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(setTheme())}>
          <FaMoon />
        </Button>
        {isUserloggedIn ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture || "path_to_default_avatar_image"}
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm"> {currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to={"/sign-in"}>
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/Projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
