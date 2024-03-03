export const getElectricityFootprint = (conso: number, people: number): number => {
    return (conso * 0.05) / people;
};