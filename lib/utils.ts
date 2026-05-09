import { BuildingData, FloorPhoto } from './types';

export function getMarkerColor(building: BuildingData): 'good' | 'partial' | 'poor' {
  const essentialFacilities = [
    building.elevator_available,
    building.toilet_available,
    building.ramp_available,
  ];
  
  const availableCount = essentialFacilities.filter(Boolean).length;
  
  if (availableCount === 3) return 'good';
  if (availableCount >= 1) return 'partial';
  return 'poor';
}

export function parseFloorPhotos(jsonString: string): FloorPhoto[] {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse floor photos:', error);
    return [];
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}
