export const getPoolFootprint = (surface: number, people: number): number => {
    const volume = surface * 1.5 * 1000;
    const waterFootprint = volume * 0.0004;
    const chlore = 24.31;
    const build = 74.81;
    return (waterFootprint + chlore + build) / people;
};