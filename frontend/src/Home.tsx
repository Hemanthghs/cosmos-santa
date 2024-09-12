import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import DrawingCanvas from "./components/DrawingCanvas";
import LeaderBoard from "./components/LeaderBoard";
import { getUsernameFromLocalStorage, setUsernameInLocalStorage } from "./utils/localStorage";
import UsernamePopup from "./components/UsernamePopup";

const Home = () => {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState<string | null>(getUsernameFromLocalStorage());
  const [showPopup, setShowPopup] = useState(!username);

  useEffect(() => {
    const storedUsername = getUsernameFromLocalStorage();
    if (!storedUsername) {
      setShowPopup(true);
    }
  }, []);

  const handleTabChange = (tabIndex: number) => {
    setTab(tabIndex);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSignOut = () => {
    setUsername(null);
    setShowPopup(true);
  };

  const handleSetUsername = (newUsername: string) => {
    setUsername(newUsername);
    setUsernameInLocalStorage(newUsername);
  };

  return (
    <div className="max-h-[100vh] w-full">
      <TopBar username={username} onSignOut={handleSignOut} />
      <TabGroup handleTabChange={handleTabChange} tab={tab} />
      <div className="px-6 h-full w-full">
        {tab === 0 && <DrawingCanvas />}
        {tab === 1 && <LeaderBoard />}
      </div>
      {showPopup && (
        <UsernamePopup
          onClose={handleClosePopup}
          onSetUsername={handleSetUsername}
        />
      )}
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
