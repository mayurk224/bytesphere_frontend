import { useState } from "react";
import Navbar from "./Navbar";
import RenderComponent from "./RenderComponent";
import Sidebar from "./Sidebar";
import AllFiles from "./tabs/AllFiles";
import RecycleBin from "./tabs/RecycleBin";
import FolderSpace from "./tabs/FolderSpace";

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState("RenderComponent");
  const components = {
    RenderComponent: <RenderComponent />,
    AllFiles: <AllFiles />,
    RecycleBin: <RecycleBin />,
    // Favorite: <Favorite />,
     Folders: <FolderSpace />,
  };
  return (
    <div className="">
      <Navbar/>

      <Sidebar setActiveComponent={setActiveComponent}/>

      <div className="w-full p-4">{components[activeComponent] || <RenderComponent />}</div>
    </div>
  );
};

export default Layout;
