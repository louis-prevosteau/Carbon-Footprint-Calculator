export const getSmokingFootprint = (cigarretes: number): number => {
    return Number((cigarretes * 0.01).toFixed(2));
};