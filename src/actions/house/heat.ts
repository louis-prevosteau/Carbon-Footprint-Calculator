export const getWoodFootprint = (conso: number, type: string, people: number): number => {
    if (type === 'log') return (conso * 1610 * 0.05) / people;
    else if (type === 'pellets') return (conso * 0.03) / people;
    else throw new Error('Type de bois non valide');
};

export const getGazFootprint = (conso: number, biogaz: boolean, people: number, part = 0): number => {
    return biogaz ? (conso * ((0.04 * part) + (0.22 * (1 - part)))) / people : (conso * 0.22) / people
};

export const getPACFootprint = (conso: number, people: number): number => {
    return ((conso / 2) * 0.05) / people;
};
export const getGazBottleFootprint = (conso: number, people: number): number => {
    return (conso * 44.92) / people;
};

export const getPropaneFootprint = (conso: number, people: number): number => {
    return (conso * 3.47) / people;
};

export const getHeatNetworkFootprint = (conso: number, people: number): number => {
    return (conso * 0.11) / people;
};

export const getFuelFootprint = (conso: number, people: number): number => {
    return (conso * 3.25) / people;
};