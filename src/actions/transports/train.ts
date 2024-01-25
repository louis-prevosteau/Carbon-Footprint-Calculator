export const calcBusFootprint = (hours: number): number => {
    return Number((hours * 1.36 * 52).toFixed(2));
};

export const calcMetroFootprint = (hours: number): number => {
    return Number((hours * 0.19 * 52).toFixed(2));
};

export const calcTrainFootprint = (distance: number): number => {
    return Number((distance * 0.01).toFixed(2));
};