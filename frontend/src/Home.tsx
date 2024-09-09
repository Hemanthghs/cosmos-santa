import React, { useState } from "react";
import TopBar from "./components/TopBar";
import DrawingCanvas from "./components/DrawingCanvas";
import LeaderBoard from "./components/LeaderBoard";

const Home = () => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (tabIndex: number) => {
    setTab(tabIndex);
  };
  return (
    <div className="max-h-[100vh] w-full">
      <TopBar />
      <TabGroup handleTabChange={handleTabChange} tab={tab} />
      <div className="px-6 h-full w-full">
        {tab === 0 && <DrawingCanvas />}
        {tab === 1 && <LeaderBoard />}
      </div>
    </div>
  );
};

export default Home;

const TabGroup = ({
  handleTabChange,
  tab,
}: {
  handleTabChange: (tabIndex: number) => void;
  tab: number;
}) => {
  return (
    <div className="px-6 flex justify-center items-center my-4">
      <div className="bg-[#29292a] px-[2px] py-[2px] rounded-full flex w-full max-w-md gap-2">
        <button
          className={`tab-btn flex-1 ${tab === 0 ? "tab-selected" : ""}`}
          onClick={() => handleTabChange(0)}
        >
          Draw
        </button>
        <button
          className={`tab-btn flex-1 ${tab === 1 ? "tab-selected" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Leader Board
        </button>
      </div>
    </div>
  );
};
