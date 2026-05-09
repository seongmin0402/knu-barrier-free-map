'use client';

import { BuildingData } from '@/lib/types';
import { parseFloorPhotos } from '@/lib/utils';
import {
  WheelchairIcon,
  ElevatorIcon,
  ToiletIcon,
  ParkingIcon,
  RampIcon,
  AutoDoorIcon,
  BrailleIcon,
  WarningIcon,
} from '@/components/icons/FacilityIcons';

interface DetailPanelProps {
  building: BuildingData | null;
  onClose: () => void;
}

export default function DetailPanel({ building, onClose }: DetailPanelProps) {
  if (!building) return null;

  const floorPhotos = building.floorPhotoGroupsJson 
    ? parseFloorPhotos(building.floorPhotoGroupsJson)
    : [];

  return (
    <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl overflow-y-auto z-10 animate-slide-in">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900 truncate">
          {building.building_name}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors focus-visible"
          aria-label="닫기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">건물 정보</h3>
          <p className="text-gray-600">층수: {building.floor}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">배리어프리 시설</h3>
          <div className="grid grid-cols-2 gap-3">
            {building.wheelchair_access && (
              <div className="flex items-center space-x-2 text-green-600">
                <WheelchairIcon className="w-5 h-5" />
                <span className="text-sm">휠체어 접근</span>
              </div>
            )}
            {building.elevator_available && (
              <div className="flex items-center space-x-2 text-green-600">
                <ElevatorIcon className="w-5 h-5" />
                <span className="text-sm">엘리베이터</span>
              </div>
            )}
            {building.toilet_available && (
              <div className="flex items-center space-x-2 text-green-600">
                <ToiletIcon className="w-5 h-5" />
                <span className="text-sm">장애인 화장실</span>
              </div>
            )}
            {building.parking_capacity > 0 && (
              <div className="flex items-center space-x-2 text-green-600">
                <ParkingIcon className="w-5 h-5" />
                <span className="text-sm">주차장 {building.parking_capacity}대</span>
              </div>
            )}
            {building.ramp_available && (
              <div className="flex items-center space-x-2 text-green-600">
                <RampIcon className="w-5 h-5" />
                <span className="text-sm">경사로</span>
              </div>
            )}
            {building.auto_door_available && (
              <div className="flex items-center space-x-2 text-green-600">
                <AutoDoorIcon className="w-5 h-5" />
                <span className="text-sm">자동문</span>
              </div>
            )}
            {building.braille_available && (
              <div className="flex items-center space-x-2 text-green-600">
                <BrailleIcon className="w-5 h-5" />
                <span className="text-sm">점자 안내</span>
              </div>
            )}
            {building.threshold_present && (
              <div className="flex items-center space-x-2 text-amber-600">
                <WarningIcon className="w-5 h-5" />
                <span className="text-sm">문턱 주의</span>
              </div>
            )}
          </div>
        </div>

        {building.parking_capacity > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">주차 정보</h3>
            <p className="text-gray-600 text-sm">
              입구에서 약 {building.parking_distance_entrance_m}m 거리
            </p>
          </div>
        )}

        {building.description && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">상세 설명</h3>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">
              {building.description}
            </p>
          </div>
        )}

        {floorPhotos.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">층별 사진</h3>
            <div className="space-y-4">
              {floorPhotos.map((floorPhoto) => (
                floorPhoto.imageFiles.length > 0 && (
                  <div key={floorPhoto.floor}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      {floorPhoto.floor}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {floorPhoto.imageFiles.map((image, idx) => (
                        <img
                          key={idx}
                          src={image.url}
                          alt={`${building.building_name} ${floorPhoto.floor} 사진 ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
