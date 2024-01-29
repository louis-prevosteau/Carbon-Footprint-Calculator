export const getHotDrinksFootprint = (drinks: HotDrinks, milk?: string): number => {
    let res = 0;
    for (const drink in drinks) {
        switch (drink) {
            case 'coffee':
                res += drinks[drink] * 10.09 * 0.012;
                break;
            case 'tea':
                res += drinks[drink] * (0.04 * (1 - 0.25)) * 0.25;
                break;
            case 'chocolate':
                if (milk) res += drinks[drink] * ((27.06 * 0.02) + (milkFootprint(milk) * 0.2));
                break;
            case 'chicory':
                res += drinks[drink] * 5.43 * 0.03;
                break;
            default:
                break;
        }
    }
    return Number((res * 52).toFixed(2));
};

const milkFootprint = (milk: string): number => {
    switch (milk) {
        case 'cow':
            return 1.32;
        case 'soy':
            return 0.44;
        case 'oat':
            return 0.54
        default:
            return 0;
    }
};

export const getWaterBottleFootprint = (conso: boolean): number => {
    return conso ? Number((0.27 * 365 * 1.5).toFixed(2)) : Number((0.27 * 135).toFixed(2));
}

export const getSodasFootprint = (conso: number): number => {
    return Number((conso * ((0.51 + 0.91) / 2) * 52).toFixed(2));
};

export const getAlcoolFootprint = (conso: number): number => {
    return Number((conso * ((1.12 + 1.22 + 0.91) / 3) * 52).toFixed(2));
};

interface HotDrinks {
    coffee: number;
    tea: number;
    chocolate: number;
    chicory: number;
}