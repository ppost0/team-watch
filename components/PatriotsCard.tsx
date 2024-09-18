import React from 'react';

interface UpcomingGame {
  name: string;
  date: string;
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
      <div className="flex items-center justify-between">
        <img src={teamLogo} alt="New England Patriots Logo" className="w-16 h-16 mb-4" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">New England Patriots</h2>
          <p className="text-base text-gray-600">{wins} - {losses}</p>
        </div>
      </div>
      {nextGame ? (
        <div className="mt-4">
          <h3 className="font-semibold">Next Game:</h3>
          <div className="flex items-center">
            <img src={nextGame.opponentLogo} alt={`${nextGame.name} Logo`} className="w-10 h-10 mr-2" />
            <div>
              <p>{nextGame.name}</p>
              <p className="text-sm text-gray-500">{nextGame.date} (Week {nextGame.week})</p>
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
