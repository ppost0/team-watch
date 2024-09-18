import React from 'react';

interface UpcomingGame {
  name: string;
  date: string;
  week: number;
  opponentLogo: string; // URL for the opponent's logo
}

interface PatriotsCardProps {
  wins: number;
  losses: number;
  nextGame: UpcomingGame | null;
  teamLogo: string; // Add this line
}

const PatriotsCard: React.FC<PatriotsCardProps> = ({ wins, losses, teamLogo, nextGame }) => {
  console.log('Team Logo URL:', teamLogo);
  return (
    <div className="border rounded-lg p-6 shadow-md"> {/* Increased padding */}
      <img src={nextGame.teamLogo} alt="New England Patriots Logo" className="w-16 h-16 mb-4" />
      <h2 className="text-xl font-bold">New England Patriots</h2>
      <p className="text-sm text-gray-600">{wins} - {losses}</p>
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
