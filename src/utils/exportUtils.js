import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { format } from 'date-fns';

export const exportToCSV = async (data, filename, headers) => {
  try {
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header.toLowerCase()] || '';
        return `"${value}"`;
      });
      csvContent += values.join(',') + '\n';
    });
    
    const fileUri = FileSystem.documentDirectory + filename;
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8
    });
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    }
    
    return { success: true, uri: fileUri };
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return { success: false, error: error.message };
  }
};

export const exportFuelsToCSV = async (fuels) => {
  const headers = ['Date', 'Odometer', 'Liters', 'Cost', 'Price Per Liter', 'Mileage', 'Station'];
  const data = fuels.map(fuel => ({
    date: fuel.date ? format(new Date(fuel.date.seconds * 1000), 'yyyy-MM-dd') : '',
    odometer: fuel.odometer || '',
    liters: fuel.liters || '',
    cost: fuel.cost || '',
    pricePerLiter: fuel.pricePerLiter || '',
    mileage: fuel.mileage || '',
    station: fuel.station || ''
  }));
  
  return await exportToCSV(data, 'fuels.csv', headers);
};

export const exportServicesToCSV = async (services) => {
  const headers = ['Date', 'Type', 'Description', 'Cost', 'Odometer', 'Next Service'];
  const data = services.map(service => ({
    date: service.date ? format(new Date(service.date.seconds * 1000), 'yyyy-MM-dd') : '',
    type: service.type || '',
    description: service.description || '',
    cost: service.cost || '',
    odometer: service.odometer || '',
    nextService: service.nextServiceKm || ''
  }));
  
  return await exportToCSV(data, 'services.csv', headers);
};

export const exportExpensesToCSV = async (expenses) => {
  const headers = ['Date', 'Category', 'Description', 'Amount'];
  const data = expenses.map(expense => ({
    date: expense.date ? format(new Date(expense.date.seconds * 1000), 'yyyy-MM-dd') : '',
    category: expense.category || '',
    description: expense.description || '',
    amount: expense.amount || ''
  }));
  
  return await exportToCSV(data, 'expenses.csv', headers);
};

export const generateGPX = (ride) => {
  const { coordinates, startTime, endTime } = ride;
  
  if (!coordinates || coordinates.length === 0) {
    return null;
  }
  
  const startDate = new Date(startTime.seconds * 1000).toISOString();
  
  let gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="SmartRide Manager" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${ride.name || 'Ride'}</name>
    <time>${startDate}</time>
  </metadata>
  <trk>
    <name>${ride.name || 'Ride'}</name>
    <trkseg>
`;

  coordinates.forEach(coord => {
    const timestamp = coord.timestamp ? new Date(coord.timestamp).toISOString() : startDate;
    gpxContent += `      <trkpt lat="${coord.latitude}" lon="${coord.longitude}">
        ${coord.altitude ? `<ele>${coord.altitude}</ele>` : ''}
        <time>${timestamp}</time>
      </trkpt>
`;
  });

  gpxContent += `    </trkseg>
  </trk>
</gpx>`;

  return gpxContent;
};

export const exportRideToGPX = async (ride) => {
  try {
    const gpxContent = generateGPX(ride);
    
    if (!gpxContent) {
      return { success: false, error: 'No coordinates to export' };
    }
    
    const filename = `ride_${format(new Date(ride.startTime.seconds * 1000), 'yyyy-MM-dd_HH-mm')}.gpx`;
    const fileUri = FileSystem.documentDirectory + filename;
    
    await FileSystem.writeAsStringAsync(fileUri, gpxContent, {
      encoding: FileSystem.EncodingType.UTF8
    });
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    }
    
    return { success: true, uri: fileUri };
  } catch (error) {
    console.error('Error exporting GPX:', error);
    return { success: false, error: error.message };
  }
};
