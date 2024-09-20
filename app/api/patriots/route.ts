import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface PatriotsData {
  team: {
    recordSummary: string;
    logo: string;
  };
  events: Array<{
    competitions: Array<{
      competitors: {
        team: {
          logos: {
            href: string;
          }[];
        };
      }[]
    }>;
    date: string;
    name: string;
    week: {
      number: number;
    };
    startTime: string;
  }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const nflApiUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/17/schedule';

    const response = await axios.get<PatriotsData>(nflApiUrl);

    const recordSummary = response.data.team.recordSummary;
    const [wins, losses] = recordSummary.split('-').map(Number);

    const upcomingGames = response.data.events.filter(event => {
      const eventDate = new Date(event.date);
      // upcoming games
      return eventDate > new Date();
    });

    const teamLogo = response.data.team.logo;

    const nextGame = upcomingGames.length > 0 ? upcomingGames[0] : null;

    let opponentLogo = null;
    let gameTime = null;
    if (nextGame) {
      opponentLogo = nextGame.competitions[0].competitors[0].team.logos[0].href;
      const startTime = new Date(nextGame.date); // Ensure this is a valid date
      gameTime = startTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: true });
    }

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

    const patriotsData = {
      wins,
      losses,
      teamLogo,
      nextGame: nextGame ? {
        opponentLogo,
        name: nextGame.name,
        date: formatDate(nextGame.date),
        time: gameTime,
        week: nextGame.week.number,
      } : null,
    };

    console.log('patriotsData', patriotsData);

    return NextResponse.json({ record: patriotsData });
  } catch (error) {
    console.error('Error fetching Patriots data:', error);
    return NextResponse.json({ error: 'Error fetching Patriots data' }, { status: 500 });
  }
}
