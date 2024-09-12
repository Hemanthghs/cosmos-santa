import React, { useState } from "react";

interface UsernamePopupProps {
  onClose: () => void;
  onSetUsername: (username: string) => void;
}

const UsernamePopup: React.FC<UsernamePopupProps> = ({ onClose, onSetUsername }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      onSetUsername(username);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#ffffff69] bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#09090a] rounded-lg p-6 w-80 shadow-2xl shadow-gray-900">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Enter Your Name
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 text-black"
          placeholder="Name"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-[#0df128a5] text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UsernamePopup;
