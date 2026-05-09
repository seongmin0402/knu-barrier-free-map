import React from 'react';
import { FacilityFilter } from '@/lib/types';
import {
  WheelchairIcon,
  ElevatorIcon,
  ToiletIcon,
  ParkingIcon,
  RampIcon,
  AutoDoorIcon,
  BrailleIcon,
} from '@/components/icons/FacilityIcons';

interface FilterPanelProps {
  filters: FacilityFilter;
  onChange: (filters: FacilityFilter) => void;
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const filterOptions = [
    { key: 'wheelchair' as keyof FacilityFilter, label: '휠체어 접근', Icon: WheelchairIcon },
    { key: 'elevator' as keyof FacilityFilter, label: '엘리베이터', Icon: ElevatorIcon },
    { key: 'toilet' as keyof FacilityFilter, label: '장애인 화장실', Icon: ToiletIcon },
    { key: 'parking' as keyof FacilityFilter, label: '장애인 주차장', Icon: ParkingIcon },
    { key: 'ramp' as keyof FacilityFilter, label: '경사로', Icon: RampIcon },
    { key: 'autoDoor' as keyof FacilityFilter, label: '자동문', Icon: AutoDoorIcon },
    { key: 'braille' as keyof FacilityFilter, label: '점자 안내', Icon: BrailleIcon },
  ];

  const handleToggle = (key: keyof FacilityFilter) => {
    onChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">시설 필터</h3>
      <div className="space-y-2">
        {filterOptions.map(({ key, label, Icon }) => (
          <label
            key={key}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => handleToggle(key)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <Icon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
