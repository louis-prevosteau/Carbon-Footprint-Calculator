export const getPlaneFootprint = (
    shortFlightTime: number,
    mediumFlightTime: number,
    longFlightTime: number
): number => {
    return shortFlightTime * 119.1 +
            mediumFlightTime * 101 +
            longFlightTime * 103.7;
};