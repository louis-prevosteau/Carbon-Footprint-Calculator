export const getBusFootprint = (hours: number): number => {
    return hours * 1.36 * 52;
};

export const getMetroFootprint = (hours: number): number => {
    return hours * 0.19 * 52;
};

export const getTrainFootprint = (distance: number): number => {
    return distance * 0.01;
};