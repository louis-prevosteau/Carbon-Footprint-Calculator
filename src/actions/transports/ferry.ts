export const getFerryFootprint = (time: number) => {
    return (time * 33 * 0.3).toFixed(2);
};