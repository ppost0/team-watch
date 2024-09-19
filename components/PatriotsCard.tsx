import React from 'react';

interface UpcomingGame {
  name: string;
  date: string;
  time: string; // Add time property
  week: number;
  opponentLogo: string;
}

interface PatriotsCardProps {
  wins: number;
  losses: number;
  nextGame: UpcomingGame | null;
  teamLogo: string;
}

const PatriotsCard: React.FC<PatriotsCardProps> = ({ wins, losses, teamLogo, nextGame }) => {

  return (
    <div className="bg-[#091932] border rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-around">
        <img src={teamLogo} alt="New England Patriots Logo" className="w-40 h-40" />
        <div className="flex items-center flex-col gap-2">
          <h2 className="text-2xl font-bold">New England Patriots</h2>
          <p className="text-2xl text-neutral-300">{wins} - {losses}</p>
        </div>
      </div>
      {nextGame ? (
        <div className="mt-4">
          <h3 className="font-semibold">Next Game:</h3>
          <div className="flex items-center">
            <img src={nextGame.opponentLogo} alt={`${nextGame.name} Logo`} className="w-10 h-10 mr-2" />
            <div>
              <p>{nextGame.name}</p>
              <p className="text-sm text-gray-500">{nextGame.date} at {nextGame.time} (Week {nextGame.week})</p> {/* Display time here */}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No upcoming games</p>
      )}
    </div>
  );
};

export default PatriotsCard;
