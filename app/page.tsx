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

    fetchPatriotsData();
    fetchPhoenixSunsData();
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
        <NewYorkMetsCard/>
        <ManchesterUnitedCard/>
      </div>
    </div>
  );
}
