import { useState, useEffect } from 'react';
import { BuildingData } from '@/lib/types';
import buildingsData from '@/data/buildings.json';

export function useBuildings() {
  const [buildings, setBuildings] = useState<BuildingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setBuildings(buildingsData as BuildingData[]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load building data');
      setLoading(false);
    }
  }, []);

  return { buildings, loading, error };
}
