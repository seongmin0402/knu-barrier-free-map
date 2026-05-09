const fs = require('fs');
const path = require('path');

const csvFilePath = 'C:\\Users\\seongmin\\Downloads\\barrier_free_data_1777947068096.csv';
const jsonFilePath = path.join(__dirname, '..', 'data', 'buildings.json');

function parseBoolean(value) {
  return value === 'true' || value === true;
}

function parseNumber(value) {
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
}

function parseFloatNum(value) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

const rawData = fs.readFileSync(csvFilePath, 'utf-8');

const lines = rawData.split('\n');
const header = lines[0].split(',');

const buildings = [];
let currentLine = 1;
let buildingId = 1;

while (currentLine < lines.length) {
  if (lines[currentLine].trim() === '') {
    currentLine++;
    continue;
  }

  let line = lines[currentLine];
  
  while ((line.match(/"/g) || []).length % 2 !== 0 || line.split(',').length < header.length) {
    currentLine++;
    if (currentLine >= lines.length) break;
    line += '\n' + lines[currentLine];
  }

  const values = [];
  let currentValue = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        currentValue += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue);

  if (values.length >= header.length) {
    const building = {
      id: `building-${buildingId}`,
      lat: parseFloatNum(values[0]),
      lng: parseFloatNum(values[1]),
      building_name: values[2],
      floor: values[3],
      wheelchair_access: parseBoolean(values[4]),
      elevator_available: parseBoolean(values[5]),
      braille_available: parseBoolean(values[6]),
      toilet_available: parseBoolean(values[7]),
      auto_door_available: parseBoolean(values[8]),
      threshold_present: parseBoolean(values[9]),
      parking_capacity: parseNumber(values[10]),
      parking_distance_entrance_m: parseNumber(values[11]),
      ramp_available: parseBoolean(values[12]),
      description: values[13],
      floorPhotoSummary: values[14],
      floorPhotoImageNames: values[15],
      floorPhotoGroupsJson: values[16],
      imageNames: values[17],
    };
    
    buildings.push(building);
    buildingId++;
  }

  currentLine++;
}

fs.mkdirSync(path.dirname(jsonFilePath), { recursive: true });
fs.writeFileSync(jsonFilePath, JSON.stringify(buildings, null, 2), 'utf-8');

console.log(`Successfully converted ${buildings.length} buildings to JSON`);
console.log(`Output: ${jsonFilePath}`);
