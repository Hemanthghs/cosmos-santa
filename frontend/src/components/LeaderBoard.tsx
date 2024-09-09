import React from 'react';

const LeaderBoard: React.FC = () => {
  const data = [
    { rank: 1, name: 'Alice', accuracy: '98%' },
    { rank: 2, name: 'Bob', accuracy: '95%' },
    { rank: 3, name: 'Charlie', accuracy: '92%' },
  ];

  return (
    <div className="flex justify-center bg-[#09090a]">
      <div className="bg-[#1e1e1e] shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
        <table className="min-w-full divide-y divide-[#2a2a2a]">
          <thead className="bg-[#7f5ced] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Accuracy</th>
            </tr>
          </thead>
          <tbody className="bg-[#1e1e1e] divide-y divide-[#2a2a2a]">
            {data.map((item) => (
              <tr key={item.rank}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.rank}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
