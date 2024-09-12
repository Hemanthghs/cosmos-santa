import React from "react";

interface TopBarProps {
  username: string | null;
  onSignOut: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ username, onSignOut }) => {
  return (
    <div className="h-16 w-full bg-[#0df128a5] flex items-center px-6 justify-between">
      <div className="font-bold text-2xl text-white">Cosmos Santa</div>
      {username && (
        <div className="flex items-center font-medium text-xl text-white">
          <span className="mr-1 italic">Hello, {username}</span>
          <button
            onClick={onSignOut}
            className="ml-2 p-1 rounded-full hover:bg-[#ffffff33] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h5a2 2 0 012 2v1"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
