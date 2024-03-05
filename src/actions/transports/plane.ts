export const getPlaneFootprint = (
    shortFlightTime: number,
    mediumFlightTime: number,
    longFlightTime: number
) => {
    return (shortFlightTime * 119.1 +
            mediumFlightTime * 101 +
            longFlightTime * 103.7).toFixed(2);
};