export const getLunchFootprint = (lunches: WeekLunches): string => {
    const footprintFactors = {
        vegan: 0.785,
        vegetarian: 1.115,
        meat1: 2.1,
        meat2: 5.51,
        fish1: 1.63,
        fish2: 2.37,
    };
    let res = Object.keys(lunches).reduce((acc, key) => {
        return acc + (lunches[key as keyof WeekLunches] * (footprintFactors[key as keyof typeof footprintFactors] || 0));
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
    const localFactors = {
        vegan: 0.785 * 0.12,
        vegetarian: 1.115 * 0.08,
        meat1: 2.1 * 0.03,
        meat2: 5.51 * 0.01,
        fish1: 1.63 * 0.05,
        fish2: 2.37 * 0.06,
    };
    let res = Object.keys(lunches).reduce((acc, key) => {
        return acc + (lunches[key as keyof WeekLunches] * (localFactors[key as keyof typeof localFactors] || 0));
    }, 0);
    return res * 52 + breakfastFP * 0.08;
};

export interface WeekLunches {
    vegan: number;
    vegetarian: number;
    meat1: number;
    meat2: number;
    fish1: number;
    fish2: number;
}