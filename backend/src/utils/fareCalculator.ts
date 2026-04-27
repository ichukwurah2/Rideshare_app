export function calculateFare(distance: number): number {
  const baseFare = 5;
  const ratePerUnit = 2.5;

  if (distance < 0) {
    throw new Error('Distance must be a non-negative number');
  }

  return Number((baseFare + ratePerUnit * distance).toFixed(2));
}
