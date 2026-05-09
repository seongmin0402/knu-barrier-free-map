'use client';

import { useEffect, useRef, useState } from 'react';
import { BuildingData } from '@/lib/types';
import { getMarkerColor } from '@/lib/utils';

interface NaverMapProps {
  buildings: BuildingData[];
  onMarkerClick?: (building: BuildingData) => void;
}

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverMap({ buildings, onMarkerClick }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    const mapCenter = new window.naver.maps.LatLng(36.4685, 127.1410);
    
    const mapOptions = {
      center: mapCenter,
      zoom: 16,
      minZoom: 14,
      maxZoom: 19,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    };

    const newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    return () => {
      if (newMap) {
        newMap.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!map || !buildings.length) return;

    markers.forEach((marker) => marker.setMap(null));

    const newMarkers = buildings.map((building) => {
      const position = new window.naver.maps.LatLng(building.lat, building.lng);
      const color = getMarkerColor(building);
      
      const markerColor = 
        color === 'good' ? '#22c55e' : 
        color === 'partial' ? '#eab308' : 
        '#ef4444';

      const marker = new window.naver.maps.Marker({
        position,
        map,
        title: building.building_name,
        icon: {
          content: `
            <div style="
              width: 32px;
              height: 32px;
              background-color: ${markerColor};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <svg width="16" height="16" fill="white" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
          `,
          anchor: new window.naver.maps.Point(16, 16),
        },
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (onMarkerClick) {
          onMarkerClick(building);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map, buildings, onMarkerClick]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      role="application"
      aria-label="공주대학교 배리어프리 지도"
    />
  );
}
