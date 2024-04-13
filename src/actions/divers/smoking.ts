export const getSmokingFootprint = (cigarretes: number): number => {
    return cigarretes * 20 * 52 * 0.014;
};