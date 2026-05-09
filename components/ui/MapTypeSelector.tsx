'use client';

interface MapTypeSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

export default function MapTypeSelector({ currentType, onTypeChange }: MapTypeSelectorProps) {
  const mapTypes = [
    { id: 'NORMAL', label: '일반', icon: '🗺️' },
    { id: 'SATELLITE', label: '위성', icon: '🛰️' },
    { id: 'HYBRID', label: '하이브리드', icon: '🌍' },
    { id: 'TERRAIN', label: '지형', icon: '⛰️' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 space-y-1">
      <div className="text-xs font-semibold text-gray-600 px-2 py-1">
        지도 유형
      </div>
      {mapTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeChange(type.id)}
          className={`
            w-full flex items-center space-x-2 px-3 py-2 rounded-lg
            transition-all duration-200 text-sm font-medium
            ${
              currentType === type.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }
          `}
          aria-label={`${type.label} 지도로 변경`}
          aria-pressed={currentType === type.id}
        >
          <span className="text-lg">{type.icon}</span>
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  );
}
