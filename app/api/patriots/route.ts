import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface PatriotsData {
  team: {
    recordSummary: string;
    logo: string;
  };
  events: Array<{
    competitions: any;
    date: string;
    name: string;
    week: {
      number: number;
    };
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
      return eventDate > new Date(); // Filter for upcoming games
    });

    const teamLogo = response.data.team.logo;
    console.log('teamLogo', teamLogo);

    const nextGame = upcomingGames.length > 0 ? upcomingGames[0] : null;

    let opponentLogo = null;
    if (nextGame) {
      opponentLogo = nextGame.competitions[0].competitors[0].team.logos[0].href;
    }
    console.log('opponentLogo', opponentLogo);

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' }; // Changed to 'short'
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const patriotsData = {
      wins,
      losses,
      nextGame: nextGame ? {
        teamLogo,
        opponentLogo,
        name: nextGame.name,
        date: formatDate(nextGame.date), // Format the date here
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
