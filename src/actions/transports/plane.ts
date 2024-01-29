export const getPlaneFootprint = (
    shortFlightTime: number,
    mediumFlightTime: number,
    longFlightTime: number
): number => {
    return Number(
        (
            shortFlightTime * 119.1 +
            mediumFlightTime * 101 +
            longFlightTime * 103.7
        ).toFixed(2)
    );
};