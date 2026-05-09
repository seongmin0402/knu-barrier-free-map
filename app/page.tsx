'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useBuildings } from '@/hooks/useBuildings';
import { useHighContrast } from '@/hooks/useHighContrast';
import { BuildingData, FacilityFilter } from '@/lib/types';
import DetailPanel from '@/components/map/DetailPanel';
import Toggle from '@/components/ui/Toggle';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';

const NaverMap = dynamic(() => import('@/components/map/NaverMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">지도를 불러오는 중...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FacilityFilter>({
    wheelchair: false,
    elevator: false,
    toilet: false,
    parking: false,
    ramp: false,
    autoDoor: false,
    braille: false,
  });
  const { buildings, loading, error } = useBuildings();
  const { isHighContrast, toggleHighContrast } = useHighContrast();

  const filteredBuildings = useMemo(() => {
    let result = buildings;

    if (searchQuery) {
      result = result.filter((building) =>
        building.building_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const activeFilters = Object.entries(filters).filter(([, value]) => value);
    if (activeFilters.length > 0) {
      result = result.filter((building) => {
        return activeFilters.every(([key]) => {
          switch (key) {
            case 'wheelchair': return building.wheelchair_access;
            case 'elevator': return building.elevator_available;
            case 'toilet': return building.toilet_available;
            case 'parking': return building.parking_capacity > 0;
            case 'ramp': return building.ramp_available;
            case 'autoDoor': return building.auto_door_available;
            case 'braille': return building.braille_available;
            default: return true;
          }
        });
      });
    }

    return result;
  }, [buildings, searchQuery, filters]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">오류 발생</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0 mr-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                공주대학교 신관캠퍼스 배리어프리 맵
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                장애인 편의시설 정보를 한눈에 확인하세요
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus-visible"
                aria-label="필터 토글"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <Toggle
                label="고대비"
                checked={isHighContrast}
                onChange={toggleHighContrast}
              />
            </div>
          </div>
          <div className="max-w-md">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="건물명으로 검색..."
            />
          </div>
        </div>
      </header>

      <div className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">데이터를 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <>
            <NaverMap
              buildings={filteredBuildings}
              onMarkerClick={(building) => setSelectedBuilding(building)}
            />
            {showFilters && (
              <div className="absolute top-4 left-4 z-10">
                <FilterPanel filters={filters} onChange={setFilters} />
              </div>
            )}
            <DetailPanel
              building={selectedBuilding}
              onClose={() => setSelectedBuilding(null)}
            />
          </>
        )}
      </div>
      
      {filteredBuildings.length > 0 && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg px-3 py-2 text-sm z-10">
          총 {filteredBuildings.length}개 건물
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs space-y-2 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>모든 주요 시설 완비</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>일부 시설 있음</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>시설 부족</span>
        </div>
      </div>
    </main>
  );
}
