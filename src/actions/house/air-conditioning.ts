export const clacAirConditioningFootprint = (clim: number, people: number): number => {
    return Number((clim * 545.05 / people).toFixed(2));
};