'use client'
import { useEffect, useState } from "react";
import PatriotsCard from "@/components/PatriotsCard";

interface UpcomingGame {
  name: string;
  date: string;
  week: number;
  opponentLogo: string; // Add this if you have the logo URL
}

interface PatriotsData {
  wins: number;
  losses: number;
  nextGame: UpcomingGame | null;
}

export default function Home() {
  const [patriotsData, setPatriotsData] = useState<PatriotsData | null>(null);
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

    fetchPatriotsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <PatriotsCard
        wins={patriotsData?.wins || 0}
        losses={patriotsData?.losses || 0}
        nextGame={patriotsData?.nextGame || null}
      />
    </div>
  );
}
