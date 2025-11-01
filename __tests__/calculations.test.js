import {
  calculateMileage,
  calculateDistance,
  calculateSpeed,
  calculateMonthlyFuelCost,
  calculateExpenseBreakdown
} from '../src/utils/calculations';

describe('Mileage Calculations', () => {
  test('calculates mileage correctly', () => {
    const result = calculateMileage(15000, 14500, 40);
    expect(result).toBe('12.50');
  });

  test('returns null for missing previous odometer', () => {
    const result = calculateMileage(15000, null, 40);
    expect(result).toBeNull();
  });

  test('returns null for zero liters', () => {
    const result = calculateMileage(15000, 14500, 0);
    expect(result).toBeNull();
  });

  test('returns null for negative distance', () => {
    const result = calculateMileage(14500, 15000, 40);
    expect(result).toBeNull();
  });
});

describe('Distance Calculations', () => {
  test('calculates distance between two points', () => {
    const coords = [
      { latitude: 40.7128, longitude: -74.0060 },
      { latitude: 40.7580, longitude: -73.9855 }
    ];
    const distance = calculateDistance(coords);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(10);
  });

  test('returns 0 for single coordinate', () => {
    const coords = [{ latitude: 40.7128, longitude: -74.0060 }];
    const distance = calculateDistance(coords);
    expect(distance).toBe(0);
  });

  test('returns 0 for empty array', () => {
    const distance = calculateDistance([]);
    expect(distance).toBe(0);
  });
});

describe('Speed Calculations', () => {
  test('calculates speed correctly', () => {
    const distance = 50;
    const duration = 3600000;
    const speed = calculateSpeed(distance, duration);
    expect(speed).toBe('50.00');
  });

  test('returns 0 for zero duration', () => {
    const speed = calculateSpeed(50, 0);
    expect(speed).toBe('0.00');
  });
});

describe('Monthly Fuel Cost', () => {
  test('aggregates fuel costs by month', () => {
    const fuels = [
      { date: { seconds: new Date('2024-01-15').getTime() / 1000 }, cost: 50 },
      { date: { seconds: new Date('2024-01-20').getTime() / 1000 }, cost: 45 },
      { date: { seconds: new Date('2024-02-10').getTime() / 1000 }, cost: 60 }
    ];
    const result = calculateMonthlyFuelCost(fuels);
    expect(result).toHaveLength(2);
    expect(result[0].cost).toBe(95);
    expect(result[1].cost).toBe(60);
  });
});

describe('Expense Breakdown', () => {
  test('categorizes expenses correctly', () => {
    const expenses = [
      { category: 'Fuel', amount: 100 },
      { category: 'Service', amount: 200 },
      { category: 'Fuel', amount: 50 }
    ];
    const result = calculateExpenseBreakdown(expenses);
    expect(result).toHaveLength(2);
    const fuelExpense = result.find(e => e.category === 'Fuel');
    expect(fuelExpense.amount).toBe(150);
  });
});
