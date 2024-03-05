export const getElectricityFootprint = (conso: number, people: number) => {
    return (conso * 0.05 / people).toFixed(2);
};