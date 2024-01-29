export const getWoodFootprint = (conso: number, type: string, people: number): number => {
    if (type === 'log') return Number(((conso * 1610 * 0.05) / people).toFixed(2));
    else if (type === 'pellets') return Number(((conso * 0.03) / people).toFixed(2));
    else throw new Error('Type de bois non valide');
};

export const getGazFootprint = (conso: number, biogaz: boolean, people: number, part = 0): number => {
    return biogaz ? Number(((conso * ((0.04 * part) + (0.22 * (1 - part)))) / people).toFixed(2)) : Number(((conso * 0.22) / people).toFixed(2))
};

export const getPACFootprint = (conso: number, people: number): number => {
    return Number((((conso / 2) * 0.05) / people).toFixed(2));
};
export const getGazBottleFootprint = (conso: number, people: number): number => {
    return Number(((conso * 44.92) / people).toFixed(2));
};

export const getPropaneFootprint = (conso: number, people: number): number => {
    return Number(((conso * 3.47) / people).toFixed(2));
};

export const getHeatNetworkFootprint = (conso: number, people: number): number => {
    return Number(((conso * 0.11) / people).toFixed(2));
};

export const getFuelFootprint = (conso: number, people: number): number => {
    return Number(((conso * 3.25) / people).toFixed(2));
};