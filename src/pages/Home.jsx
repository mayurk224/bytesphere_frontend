import React, { useState } from "react";
import AllFiles from "../components/tabs/AllFiles";
import RecycleBin from "../components/tabs/RecycleBin";
import FolderSpace from "../components/tabs/FolderSpace";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Overview from "../components/tabs/Overview";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Overview");
  const renderComponent = () => {
    switch (activeComponent) {
      case "Overview":
        return <Overview />;
      case "AllFiles":
        return <AllFiles />;
      case "Favorites":
      // return <Favorites />;
      case "Folders":
        return <FolderSpace />;
      case "SharedFiles":
      // return <SharedFiles />;
      case "RecycleBin":
        return <RecycleBin />;
      default:
        return <Overview />;
    }
  };
  return (
    <div className="">
      <div className="flex">
        <div className="fixed z-60">
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>
        <div className="overflow-hidden">
          <div className="mb-14">
            <Navbar />
          </div>
          <div className="ml-60 max-sm:ml-0">
            <div className="w-full p-4 overflow-hidden">
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
