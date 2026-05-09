export interface BuildingData {
  id: string;
  lat: number;
  lng: number;
  building_name: string;
  floor: string;
  wheelchair_access: boolean;
  elevator_available: boolean;
  braille_available: boolean;
  toilet_available: boolean;
  auto_door_available: boolean;
  threshold_present: boolean;
  parking_capacity: number;
  parking_distance_entrance_m: number;
  ramp_available: boolean;
  description: string;
  floorPhotoSummary: string;
  floorPhotoImageNames: string;
  floorPhotoGroupsJson: string;
  imageNames: string;
}

export interface FloorPhoto {
  floor: string;
  imageFiles: ImageFile[];
  imageNames: string[];
}

export interface ImageFile {
  url: string;
  name: string;
  path: string;
  type: string;
  bucket: string;
  originalName: string;
}

export interface FacilityFilter {
  wheelchair: boolean;
  elevator: boolean;
  toilet: boolean;
  parking: boolean;
  ramp: boolean;
  autoDoor: boolean;
  braille: boolean;
}

export interface MapCenter {
  lat: number;
  lng: number;
}

export interface MarkerColor {
  good: string;    // 녹색: 주요 시설 모두 갖춤
  partial: string; // 노란색: 일부 시설 있음
  poor: string;    // 빨간색: 시설 부족
}
