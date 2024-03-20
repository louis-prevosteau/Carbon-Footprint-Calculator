export const getWoodFootprint = (conso: number, type: string, people: number) => {
    if (type === 'log') return (conso * 1610 * 0.05 / people).toFixed(2);
    else if (type === 'pellets') return (conso * 0.03 / people).toFixed(2);
    else return 0;
};

export const getGazFootprint = (conso: number, biogaz: boolean, people: number, part: number) => {
    return biogaz ? ((conso * ((0.04 * (part / 100)) + (0.22 * (1 - (part / 100))))) / people).toFixed(2) : (conso * 0.22 / people).toFixed(2);
};

export const getGazBottleFootprint = (conso: number, people: number) => {
    return (conso * 44.92 / people).toFixed(2);
};

export const getPropaneFootprint = (conso: number, people: number) => {
    return (conso * 3.47 / people).toFixed(2);
};

export const getHeatNetworkFootprint = (conso: number, people: number) => {
    return (conso * 0.11 / people).toFixed(2);
};

export const getFuelFootprint = (conso: number, people: number) => {
    return (conso * 3.25 / people).toFixed(2);
};