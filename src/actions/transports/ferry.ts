export const calcFerryFootprint = (time: number): number => {
    return Number((time * 33 * 0.3).toFixed(2));
};