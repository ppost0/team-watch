import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface SunsData {
  team: {
    recordSummary: string;
    logo: string; // Added logo property
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: Array<{
    name: string;
    date: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    competitions: any[]
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
  // Check if the date is today
  if (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()) {
    return "Today";
  }
  // date format
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const sunsApiUrl = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/21/schedule';

    const response = await axios.get<SunsData>(sunsApiUrl);

    console.log('HERE', response.data.events[0])

    const recordSummary = response.data.team.recordSummary;
    const [wins, losses] = recordSummary.split('-').map(Number);

    const upcomingGames = response.data.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate > new Date();
    });

    const teamLogo = response.data.team.logo;

    const nextGame = upcomingGames.length > 0 ? upcomingGames[0] : null;

    let opponentLogo = null;
    let gameTime = null;

    if (nextGame) {
      opponentLogo = nextGame.competitions[0].competitors[0].team.logos[0].href;
      const startTime = new Date(nextGame.date);
      gameTime = startTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true });
    }

    const sunsData = {
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

    return NextResponse.json({ record: sunsData });
  } catch (error) {
    console.error('Error fetching Suns data:', error);
    return NextResponse.json({ error: 'Error fetching Suns data' }, { status: 500 });
  }
}
