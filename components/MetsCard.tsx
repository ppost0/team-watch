import React from 'react';

interface UpcomingGame {
  name: string;
  date: string;
  time: string;
  week: number;
  opponentLogo: string;
}

interface NewYorkMetsCardProps {
  wins: number;
  losses: number;
  nextGame: UpcomingGame | null;
  teamLogo: string;
}

const NewYorkMetsCard: React.FC<NewYorkMetsCardProps> = ({ wins, losses, teamLogo, nextGame }) => {
  return (
    <div className="bg-[#002D72] border rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-around">
        <img src={teamLogo} alt="New York Mets Logo" className="w-40 h-40" />
        <div className="flex items-center flex-col gap-2">
          <h2 className="text-2xl font-bold">New York Mets</h2>
          <p className="text-2xl text-neutral-300">{wins} - {losses}</p>
        </div>
      </div>
      {nextGame ? (
        <div className="mt-4">
          <h3 className="font-semibold px-2 text-gray-200">Next Game:</h3>
          <div className="flex items-center gap-4 px-2">
            <img src={nextGame.opponentLogo} alt={`${nextGame.name} Logo`} className="w-14 h-14" />
            <div>
              <p className='text-gray-200'>{nextGame.name}</p>
              <p className="text-sm text-gray-500">{nextGame.date} at {nextGame.time} (Week {nextGame.week})</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No upcoming games</p>
      )}
    </div>
  );
};

export default NewYorkMetsCard;
