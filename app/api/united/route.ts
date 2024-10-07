import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface UnitedData {
  team: {
    recordSummary: string;
    logo: string;
  };
  events: Array<{
    name: string;
    date: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const unitedApiUrl = 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/360/schedule';

    const response = await axios.get<UnitedData>(unitedApiUrl);
    const recordSummary = response.data.team.recordSummary;
    const [wins, losses, draws] = recordSummary.split('-').map(Number);
    const teamLogo = response.data.team.logo;

    const upcomingGames = response.data.events.filter(event => {
      const eventDate = new Date(event.date);
      console.log('eventDate', eventDate)
      return eventDate > new Date();
    });
    console.log('upcomingGames', upcomingGames)

    const nextGame = upcomingGames.length > 0 ? upcomingGames[0] : null;

    let opponentLogo = null;
    let gameTime = null;

    if (nextGame) {
      opponentLogo = nextGame.competitions[0].competitors[1].team.logos[0].href;
      const startTime = new Date(nextGame.date);
      gameTime = startTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true });
    }

    const unitedData = {
      wins,
      losses,
      draws,
      teamLogo,
      nextGame: nextGame ? {
        opponentLogo,
        name: nextGame.name,
        date: formatDate(nextGame.date),
        time: gameTime,
      } : null,
    };

    return NextResponse.json({ record: unitedData });
  } catch (error) {
    console.error('Error fetching United data:', error);
    return NextResponse.json({ error: 'Error fetching United data' }, { status: 500 });
  }
}
