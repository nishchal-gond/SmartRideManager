import { checkServiceDue } from '../src/services/notificationService';

describe('Service Reminder Logic', () => {
  test('detects service due by kilometers', () => {
    const lastServiceOdometer = 10000;
    const currentOdometer = 15500;
    const serviceInterval = 5000;
    const lastServiceDate = new Date('2024-01-01');
    const serviceIntervalDays = 365;

    const result = checkServiceDue(
      lastServiceOdometer,
      currentOdometer,
      serviceInterval,
      lastServiceDate,
      serviceIntervalDays
    );

    expect(result.isDue).toBe(true);
    expect(result.kmDue).toBe(true);
  });

  test('detects service not due', () => {
    const lastServiceOdometer = 10000;
    const currentOdometer = 12000;
    const serviceInterval = 5000;
    const lastServiceDate = new Date();
    const serviceIntervalDays = 365;

    const result = checkServiceDue(
      lastServiceOdometer,
      currentOdometer,
      serviceInterval,
      lastServiceDate,
      serviceIntervalDays
    );

    expect(result.isDue).toBe(false);
    expect(result.kmDue).toBe(false);
    expect(result.dateDue).toBe(false);
  });

  test('calculates km remaining correctly', () => {
    const lastServiceOdometer = 10000;
    const currentOdometer = 12000;
    const serviceInterval = 5000;
    const lastServiceDate = new Date();
    const serviceIntervalDays = 365;

    const result = checkServiceDue(
      lastServiceOdometer,
      currentOdometer,
      serviceInterval,
      lastServiceDate,
      serviceIntervalDays
    );

    expect(result.kmRemaining).toBe(3000);
  });

  test('detects service due by date', () => {
    const lastServiceOdometer = 10000;
    const currentOdometer = 11000;
    const serviceInterval = 5000;
    const lastServiceDate = new Date('2020-01-01');
    const serviceIntervalDays = 365;

    const result = checkServiceDue(
      lastServiceOdometer,
      currentOdometer,
      serviceInterval,
      lastServiceDate,
      serviceIntervalDays
    );

    expect(result.isDue).toBe(true);
    expect(result.dateDue).toBe(true);
  });
});
