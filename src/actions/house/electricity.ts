export const getElectricityFootprint = (conso: number, people: number): number => {
    return Number(((conso * 0.05) / people).toFixed(2));
};