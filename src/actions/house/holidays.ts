import { HOLIDAYS_FOOTPRINTS, SEASON_FACTORS } from "utils/constants";

export const getHolidaysFootprint = (holidaysResidences: HolidaysResidences, people: number) => {
    let res = 0;
    for (const residence in holidaysResidences) {
        if (residence === 'hotel') {
            let nights = 0;
            if (people > 8) nights = holidaysResidences[residence] * 3;
            else if (people > 4 && people <= 8) nights = holidaysResidences[residence] * 2;
            else nights = holidaysResidences[residence];
            res += nights * HOLIDAYS_FOOTPRINTS[residence as keyof typeof HOLIDAYS_FOOTPRINTS]
        } else res += holidaysResidences[residence as keyof typeof holidaysResidences] * HOLIDAYS_FOOTPRINTS[residence as keyof typeof HOLIDAYS_FOOTPRINTS];
    }
    return (res / people).toFixed(2);
};

const getSeasonFactor = (location: string, season: string): number => {
    if (location === '' && season === '') return 0;
    if (location === 'mediterranean' || location === 'mountain') return SEASON_FACTORS[location][season as keyof typeof SEASON_FACTORS[typeof location]];
    else return SEASON_FACTORS['default'][season as keyof typeof SEASON_FACTORS['default']];
};

export const getSecondaryResidenceFootprint = (people: number, surface: number, duration: number, location: string, season: string) => {
    let res = 0;
    res += surface * 9.5;
    const dayRatio = duration / 365;
    res += surface * 1.48 * dayRatio;
    res += getSeasonFactor(location, season) * (19.95 + 1.73) * surface * dayRatio
    return (res / people).toFixed(2);
};

interface HolidaysResidences {
    hotel: number;
    camping: number;
    youthHotel: number;
    homeRental: number;
    familly: number;
    homeExchange: number;
}