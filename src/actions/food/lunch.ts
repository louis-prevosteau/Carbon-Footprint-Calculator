import { LUNCHES } from "utils/constants";

export const getLunchFootprint = (lunches: WeekLunches): string => {
    let res = Object.keys(lunches).reduce((acc, key) => {
        return acc + (lunches[key as keyof WeekLunches] * (LUNCHES[key as keyof typeof LUNCHES].footprint || 0));
    }, 0);
    return (res * 52).toFixed(2);
};

export const getBreakfastFootprint = (value: string, milk: string): string => {
    const breakfastFootprint = {
        british: 1.124,
        continental: 0.289,
        vegan: 0.419,
    };
    let res = breakfastFootprint[value as keyof typeof breakfastFootprint] || 0;
    const milkFootprint = {
        cow: 0.47,
        soy: 0.29,
        oat: 0.312,
    };
    if (value === 'milk') {
        res += milkFootprint[milk as keyof typeof milkFootprint] || 0;
    }
    return (res * 365).toFixed(2);
};

export const getSeasonBonus = (level: string, breakfastFP: number, lunchesFP: number): number => {
    const footprint = 0.073 * (breakfastFP + lunchesFP);
    const levelFactors = {
        never: 0,
        sometimes: -(1 / 3) / 2.26,
        often: -(2 / 3) / 2.26,
        always: -1 / 2.26,
    };
    return Number((footprint * (levelFactors[level as keyof typeof levelFactors] || 0)).toFixed(2));
};

export const getLocalBonus = (level: string, lunches: WeekLunches, breakfastFB: number): number => {
    if (level === '' && Object.values(lunches).every((v) => v === 0) && breakfastFB === 0) return 0;
    const localPart = getLocalPart(lunches, breakfastFB);
    const levelFactors = {
        never: 0,
        sometimes: -(1 / 3),
        often: -(2 / 3),
        always: -1,
    };
    return levelFactors[level as keyof typeof levelFactors] * localPart;
};

const getLocalPart = (lunches: WeekLunches, breakfastFP: number): number => {
    let res = Object.keys(lunches).reduce((acc, key) => {
        return acc + (lunches[key as keyof WeekLunches] * (LUNCHES[key as keyof typeof LUNCHES].footprint * LUNCHES[key as keyof typeof LUNCHES].localPart || 0));
    }, 0);
    return (res + (breakfastFP / 365) * 7 * 0.08) * 52;
};

export interface WeekLunches {
    vegan: number;
    vegetarian: number;
    meat1: number;
    meat2: number;
    fish1: number;
    fish2: number;
}