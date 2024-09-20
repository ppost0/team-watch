import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface MetsData {
  team: {
    recordSummary: string;
    logo: string; // Added logo property
  };
  events: Array<{
    name: string;
    date: string;
    competitions: any[];
  }>;
  wins: number;
  losses: number;
  teamLogo: string;
  nextGame: UpcomingGame | null;
}

interface UpcomingGame {
  name: string;
  date: string;
  time: string;
  opponentLogo: string;
}

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  if (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()) {
    return "Today";
  }
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const metsApiUrl = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/21/schedule';

    const response = await axios.get<MetsData>(metsApiUrl);
    const recordSummary = response.data.team.recordSummary;
    const [wins, losses] = recordSummary.split('-').map(Number);
    const teamLogo = response.data.team.logo;

    const upcomingGames = response.data.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate > new Date();
    });

    const nextGame = upcomingGames.length > 0 ? upcomingGames[0] : null;

    let opponentLogo = null;
    let gameTime = null;

    if (nextGame) {
      opponentLogo = nextGame.competitions[0].competitors[1].team.logos[0].href;
      const startTime = new Date(nextGame.date);
      gameTime = startTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true });
    }

    const metsData = {
      wins,
      losses,
      teamLogo,
      nextGame: nextGame ? {
        opponentLogo,
        name: nextGame.name,
        date: formatDate(nextGame.date),
        time: gameTime,
      } : null,
    };

    return NextResponse.json({ record: metsData });
  } catch (error) {
    console.error('Error fetching Mets data:', error);
    return NextResponse.json({ error: 'Error fetching Mets data' }, { status: 500 });
  }
}
