export const getElectricityFootprint = (conso: number, people: number) => {
    return (conso * 0.052 / people).toFixed(2);
};