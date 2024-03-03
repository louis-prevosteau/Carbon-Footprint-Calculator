export const getLunchFootprint = (lunches: WeekLunches): number => {
    let res = 0;
    for (const lunch in lunches) {
        switch (lunch) {
            case 'vegan':
                res += lunches[lunch] * 0.785;
                break;
            case 'vegetarian':
                res += lunches[lunch] * 1.115;
                break;
            case 'meat1':
                res += lunches[lunch] * 2.1;
                break;
            case 'meat2':
                res += lunches[lunch] * 5.51;
                break;
            case 'fish1':
                res += lunches[lunch] * 1.63;
                break;
            case 'fish2':
                res += lunches[lunch] * 2.37;
                break;
            default:
                break;
        }
    }
    return res * 52;
};

export const getBreakfastFootprint = (value: string, milk: string): number => {
    let res = 0;
    switch (value) {
        case 'british':
            res += 1.124;
            break;
        case 'continental':
            res += 0.289;
            break;
        case 'vegan':
            res += 0.419;
            break;
        case 'milk':
            switch (milk) {
                case 'cow':
                    res += 0.47;
                    break;
                case 'soy':
                    res += 0.29;
                    break;
                case 'oat':
                    res += 0.312;
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return res * 365;
};

export const getSeasonBonus = (level: string, breakfast: string, milk: string, lunches: WeekLunches): number => {
    switch (level) {
        case 'never':
            return 0;
        case 'sometimes':
            return (- (1 / 3) / 2.26) * (0.073 * (getBreakfastFootprint(breakfast, milk) + getLunchFootprint(lunches)));
        case 'often':
            return (- (2 / 3) / 2.26) * (0.073 * (getBreakfastFootprint(breakfast, milk) + getLunchFootprint(lunches)));
        case 'always':
            return (- 1 / 2.26) * (0.073 * (getBreakfastFootprint(breakfast, milk) + getLunchFootprint(lunches)));
        default:
            return 0;
    }
};

export const getLocalBonus = (level: string, breakfast: string, lunches: WeekLunches, milk: string): number => {
    switch (level) {
        case 'never':
            return 0;
        case 'sometimes':
            return - (1 / 3) * getLocalPart(lunches, breakfast, milk);
        case 'often':
            return - (2 / 3) * getLocalPart(lunches, breakfast, milk);
        case 'always':
            return - getLocalPart(lunches, breakfast, milk);
        default:
            return 0;
    }
};

const getLocalPart = (lunches: WeekLunches, breakfast: string, milk: string): number => {
    let res = 0;
    for (const lunch in lunches) {
        switch (lunch) {
            case 'vegan':
                res += lunches[lunch] * 0.785 * 0.12;
                break;
            case 'vegetarian':
                res += lunches[lunch] * 1.115 * 0.08;
                break;
            case 'meat1':
                res += lunches[lunch] * 2.1 * 0.03;
                break;
            case 'meat2':
                res += lunches[lunch] * 5.51 * 0.01;
                break;
            case 'fish1':
                res += lunches[lunch] * 1.63 * 0.05;
                break;
            case 'fish2':
                res += lunches[lunch] * 2.37 * 0.06;
                break;
            default:
                break;
        }
    }
    return res * 52 + getBreakfastFootprint(breakfast, milk) * 0.08;
};

interface WeekLunches {
    vegan: number;
    vegetarian: number;
    meat1: number;
    meat2: number;
    fish1: number;
    fish2: number;
}