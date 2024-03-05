export const getBusFootprint = (hours: number) => {
    return (hours * 1.3557 * 52).toFixed(2);
};

export const getMetroFootprint = (hours: number) => {
    return (hours * 0.1851 * 52).toFixed(2);
};

export const getTrainFootprint = (distance: number) => {
    return (distance * 0.00882).toFixed(2);
};