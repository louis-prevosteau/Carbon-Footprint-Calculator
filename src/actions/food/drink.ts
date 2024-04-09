import { HOT_DRINKS_FOOTPRINTS, HOT_DRINKS_MILK_FOOTPRINTS } from "utils/constants";

export const getHotDrinksFootprint = (drinks: HotDrinks, milk: string) => {
    let res = 0;
    for (const drink in drinks) {
        if (drink === 'chocolate') res += drinks[drink] * (HOT_DRINKS_FOOTPRINTS[drink as keyof typeof HOT_DRINKS_FOOTPRINTS] + (milkFootprint(milk) * 0.2))
        else res += drinks[drink as keyof typeof drinks] * HOT_DRINKS_FOOTPRINTS[drink as keyof typeof HOT_DRINKS_FOOTPRINTS];
    }
    return (res * 52).toFixed(2);
};

const milkFootprint = (milk: string): number => {
    if (milk === '') return 0;
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