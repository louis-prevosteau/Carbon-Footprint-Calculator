export const clacAirConditioningFootprint = (clim: number, people: number) => {
    return (clim * 545.05 / people).toFixed(2);
};