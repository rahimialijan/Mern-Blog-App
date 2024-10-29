import { Sidebar } from "flowbite-react";
import { HiArrowSmDown, HiUser } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function DashSidbar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  console.log("location", location);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log("tapFromUrl", tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={`/dashboard?tab=profile`}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label="User"
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmDown} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidbar;
