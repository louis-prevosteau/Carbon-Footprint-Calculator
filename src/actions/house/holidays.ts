export const getHolidaysFootprint = (holidaysResidences: HolidaysResidences, people: number) => {
    let res = 0;
    for (const residence in holidaysResidences) {
        switch (residence) {
            case 'hotel':
                if (people > 8) res += (3 * holidaysResidences[residence]) * 6.93;
                else if (people > 4 && people <= 8) res += (2 * holidaysResidences[residence]) * 6.93;
                else res += holidaysResidences[residence] * 6.93;
                break;    
            case 'camping':
                res += holidaysResidences[residence] * 1.4;
                break;
            case 'youthHotel':
                res += holidaysResidences[residence] * 1.16;
                break;
            case 'homeRental':
                res += holidaysResidences[residence] * 5.8;
                break;
            case 'familly':
                res += holidaysResidences[residence] * 0;
                break;
            case 'homeExchange':
                res += holidaysResidences[residence] * 3.52;
                break;  
            default:
                break;
        }
    }
    return (res / people).toFixed(2);
};

export const getSecondaryResidenceFootprint = (people: number, surface: number, duration: number, location: string, season: string) => {
    let res = 0;
    res += surface * 9.5;
    const dayRatio = duration / 365;
    res += surface * 1.48 * dayRatio;
    let seasonFactor = 0;
    if (location === 'mediterranean')
        switch (season) {
            case 'summer':
                seasonFactor = 0;
                break;    
            case 'summer+':
                seasonFactor = 0.13;
                break;
            case 'winter':
                seasonFactor = 1.41;
                break;
            case 'winter+':
                seasonFactor = 1.62;
                break;    
            default:
                break;
        }    
    else if (location === 'mountain')
        switch (season) {
            case 'summer':
                seasonFactor = 0.06;
                break;    
            case 'summer+':
                seasonFactor = 0.76;
                break;
            case 'winter':
                seasonFactor = 2.68;
                break;
            case 'winter+':
                seasonFactor = 2.15;
                break;    
            default:
                break;
        }
    else
        switch (season) {
            case 'summer':
                seasonFactor = 0.06;
                break;    
            case 'summer+':
                seasonFactor = 0.46;
                break;
            case 'winter':
                seasonFactor = 2.26;
                break;
            case 'winter+':
                seasonFactor = 1.71;
                break;    
            default:
                break;
        }
    res += seasonFactor * (19.95 + 1.73) * surface * dayRatio
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