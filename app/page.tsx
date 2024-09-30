'use client'
import { useEffect, useState } from "react";
import PatriotsCard from "@/components/PatriotsCard";
import Header from "@/components/Header";
import PhoenixSunsCard from "@/components/SunsCard";
import NewYorkMetsCard from "@/components/MetsCard";
import ManchesterUnitedCard from "@/components/UnitedCard";

interface UpcomingGame {
  name: string;
  date: string;
  time: string; // Add time property
  week: number;
  opponentLogo: string;
}

interface PatriotsData {
  wins: number;
  losses: number;
  teamLogo: string;
  nextGame: UpcomingGame | null;
}

export default function Home() {
  const [patriotsData, setPatriotsData] = useState<PatriotsData | null>(null);
  const [phoenixSunsData, setPhoenixSunsData] = useState<PatriotsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [metsData, setMetsData] = useState<PatriotsData | null>(null); // Add state for Mets data
  const [manchesterUnitedData, setManchesterUnitedData] = useState<PatriotsData | null>(null); // Add state for Manchester United data

  useEffect(() => {
    const fetchPatriotsData = async () => {
      try {
        const response = await fetch('/api/patriots');
        const data = await response.json();
        setPatriotsData(data.record);
      } catch (error) {
        console.error('Error fetching Patriots data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPhoenixSunsData = async () => {
      try {
        const response = await fetch('/api/suns');
        const data = await response.json();
        setPhoenixSunsData(data.record);
      } catch (error) {
        console.error('Error fetching Phoenix Suns data:', error);
      }
    };

    const fetchMetsData = async () => { // Add fetch function for Mets data
      try {
        const response = await fetch('/api/mets');
        const data = await response.json();
        setMetsData(data.record);
      } catch (error) {
        console.error('Error fetching Mets data:', error);
      }
    };

    const fetchManchesterUnitedData = async () => { // Add fetch function for Manchester United data
      try {
        const response = await fetch('/api/united');
        const data = await response.json();
        setManchesterUnitedData(data.record);
      } catch (error) {
        console.error('Error fetching Manchester United data:', error);
      }
    };

    fetchPatriotsData();
    fetchPhoenixSunsData();
    fetchMetsData(); // Call the fetch function for Mets data
    fetchManchesterUnitedData(); // Call the fetch function for Manchester United data
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="grid grid-cols-2 gap-12 p-12 items-center justify-center">
        <PatriotsCard
          wins={patriotsData?.wins || 0}
          losses={patriotsData?.losses || 0}
          teamLogo={patriotsData?.teamLogo || ''}
          nextGame={patriotsData?.nextGame || null}
        />
        <PhoenixSunsCard
          wins={phoenixSunsData?.wins || 0}
          losses={phoenixSunsData?.losses || 0}
          teamLogo={phoenixSunsData?.teamLogo || ''}
          nextGame={phoenixSunsData?.nextGame || null}
        />
        <NewYorkMetsCard
          wins={metsData?.wins || 0}
          losses={metsData?.losses || 0}
          teamLogo={metsData?.teamLogo || ''}
          nextGame={metsData?.nextGame || null}
        />
        <ManchesterUnitedCard
          wins={manchesterUnitedData?.wins || 0}
          losses={manchesterUnitedData?.losses || 0}
          teamLogo={manchesterUnitedData?.teamLogo || ''}
          nextGame={manchesterUnitedData?.nextGame || null}
        />
      </div>
    </div>
  );
}
