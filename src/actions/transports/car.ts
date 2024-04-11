import { EMISION_PER_KILOMETER, FUEL_FP_PER_LITER } from "utils/constants";

export const getCarFootprint = (
    distance: number,
    sameCar: boolean,
    type: string,
    motor: string,
    people: number,
    recent: boolean,
    fuel: string,
    conso: number
) => {
    if (distance === 0) return 0;
    else if (sameCar) return ((getUsage(distance, motor, conso, fuel, type) + getConstructAmort(motor, type, recent)) / people).toFixed(2);
    else if (!sameCar) return ((getUsage(distance, motor, conso, fuel, type) + ((getConstruct(motor, type) as number / 10) * (distance / 15130))) / people).toFixed(2);
    
};

export const getVanFootprint = (
    distance: number,
    conso: number,
    people: number
) => {
    if (conso === 0 && distance === 0) return 0;
    const usage = (distance * (conso / 100) * 2.7) / people;
    const construct = (7600 * (300 / 1500) / 25) / people;;
    return (usage + construct).toFixed(2);
};

export const getCaravanFootprint = (
    people: number,
    distance: number,
    motorType: string
) => {
    const surchargeEmissionsPerKm = EMISION_PER_KILOMETER[motorType as keyof typeof EMISION_PER_KILOMETER] * 0.25;
    const totalUsageEmissions = (surchargeEmissionsPerKm * distance) / people;
    const constructionEmissions = (3800 * 25) / people;
    const totalFootprint = totalUsageEmissions + constructionEmissions;
    return totalFootprint.toFixed(2);
};

export const getCampingCarFootprint = (
    distance: number,
    conso: number,
    people: number
) => {
    if (conso === 0 && distance === 0) return 0;
    const usage =(distance * (conso / 100) * 2.7) / people;
    const construct = (7600 * (300 / 1500) / 25) / people;
    return (usage + construct).toFixed(2);
};

const getUsage = (distance: number, motor: string, conso: number, fuel: string, type: string): number => {
    let kmFp = 0;
    const maintenance = (((6036 * 1000000) * 0.07) / 44677000) / distance
    let entPond = 0;
    const clim = (1374000000 / 44677000) / distance;
    const consoKm = conso / 100;
    if (motor === 'thermic') {
        kmFp = consoKm * FUEL_FP_PER_LITER[fuel as keyof typeof FUEL_FP_PER_LITER];
        entPond = maintenance;
    }
    else if (motor === 'hybrid') {
        kmFp = consoKm * FUEL_FP_PER_LITER[fuel as keyof typeof FUEL_FP_PER_LITER] * 0.85;
        entPond = maintenance * 0.9;
    }
    else if (motor === 'electric') {
        if (type === 'small') kmFp = 0.0159;
        else if (type === 'medium') kmFp = 0.0198;
        else kmFp = 0.0273;
        entPond = maintenance * 0.75;
    }
    const baseKm = entPond + clim; 
    return distance * (kmFp + baseKm);
}

const getConstruct = (motor: string, type: string) => {
    if (motor === 'thermic') {
        if (type === 'small' || type === 'medium') return 6700;
        else if (type === 'berline' || type === 'vul' || type === 'suv') return 7600;    
    } else if (motor === 'hybrid') {
        if (type === 'small' || type === 'medium') return 9600;
        else if (type === 'berline' || type === 'vul' || type === 'suv') return 6900;
    } else if (motor === 'electric') {
        if (type === 'small' || type === 'medium') return 10200;
        else if (type === 'berline' || type === 'vul' || type === 'suv') return 20200;
    }
}

const getConstructAmort = (motor: string, type: string, recent: boolean) => {
    const amort = recent ? 0.1 : 0;
    return getConstruct(motor, type) as number * amort;
}