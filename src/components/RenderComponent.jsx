import React from "react";
import QuickCard from "./QuickCard";
import FavoriteCard from "./FavoriteCard";
import RecentFileTable from "./RecentFileTable";
import UploadMultipleFiles from "./UploadMultipleFiles";

const RenderComponent = () => {
  return (
    <div className="ml-64 max-[370px]:ml-0 mt-14">
      <div className="p-3 quickAccessSection flex justify-between">
        <div className=" flex flex-col gap-4 ">
          <div className="">
            <h5 class="text-xl font-bold dark:text-white">Quick Access</h5>
          </div>
          <div className="quickAccessContainer flex flex-wrap gap-4">
            <QuickCard />
            <QuickCard />
            <QuickCard />
            <QuickCard />
            <QuickCard />
          </div>
        </div>
        <div className="">
          <UploadMultipleFiles/>
        </div>
      </div>
      <div className="favoriteSection p-3">
        <div className="flex items-center justify-between pr-6 border-gray-700">
          <h2 className="text-xl font-bold text-white">Favorite Files</h2>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center transition-colors duration-200">
            View All
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="cardContainer mt-4 flex gap-4">
          <FavoriteCard />
          <FavoriteCard />
          <FavoriteCard />
        </div>
      </div>

      <div className="recentFilesSection">
        <RecentFileTable />
      </div>
    </div>
  );
};

export default RenderComponent;
