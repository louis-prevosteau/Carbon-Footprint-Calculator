export const clacAirConditioningFootprint = (clim: number, people: number): number => {
    return clim * 545.05 / people;
};