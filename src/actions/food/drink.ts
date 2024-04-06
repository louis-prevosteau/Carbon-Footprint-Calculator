import { HOT_DRINKS_MILK_FOOTPRINTS } from "utils/constants";

export const getHotDrinksFootprint = (drinks: HotDrinks, milk: string) => {
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
                res += drinks[drink] * ((27.06 * 0.02) + (milkFootprint(milk) * 0.2));
                break;
            case 'chicory':
                res += drinks[drink] * 5.43 * 0.03;
                break;
            default:
                break;
        }
    }
    return (res * 52).toFixed(2);
};

const milkFootprint = (milk: string): number => {
    return HOT_DRINKS_MILK_FOOTPRINTS[milk as keyof typeof HOT_DRINKS_MILK_FOOTPRINTS]
};

export const getWaterBottleFootprint = (conso: boolean): number => {
    return conso ? 0.27 * 365 * 1.5 : 0;
}

export const getSodasFootprint = (conso: number): number => {
    return conso * ((0.51 + 0.91) / 2) * 52;
};

export const getAlcoolFootprint = (conso: number): number => {
    return conso * ((1.12 + 1.22 + 0.91) / 3) * 52;
};

interface HotDrinks {
    coffee: number;
    tea: number;
    chocolate: number;
    chicory: number;
}