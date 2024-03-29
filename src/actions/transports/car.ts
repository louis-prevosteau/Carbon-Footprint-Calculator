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
    conso: number
) => {
    return ((conso / 100) * distance).toFixed(2);
};

type EmissionsPerKilometer = {
    [key: string]: number;
};

export const getCaravanFootprint = (
    numberOfPeople: number,
    distance: number,
    motorType: string
) => {
    const emissionsPerKilometer: EmissionsPerKilometer = {
        thermic: 0.13,
        hybrid: 0.11,
        electric: 0.03,
    };
    const surchargeEmissionsPerKm = emissionsPerKilometer[motorType] * 0.25;
    const totalUsageEmissions = (surchargeEmissionsPerKm * distance) / numberOfPeople;
    const constructionEmissions = (3800 * 25) / numberOfPeople;
    const totalFootprint = totalUsageEmissions + constructionEmissions;
    return totalFootprint.toFixed(2);
};

export const getCampingCarFootprint = (
    distance: number,
    conso: number
) => {
    return ((conso / 100) * distance).toFixed(2);
};

const getUsage = (distance: number, motor: string, conso: number, fuel: string, type: string): number => {
    let kmFp = 0;
    let entPond = 0;
    const clim = (1374000000 / 44677000) / distance;
    if (motor === 'thermic') {
        const consoKm = conso / 100;
        let fpPerLitre = 0;
        if (fuel === 'gazole') fpPerLitre = (3.1 + 3.04) / 2;
        else if (fuel === 'essence') fpPerLitre = 2.7;
        else if (fuel === 'bio') fpPerLitre = 1.11;
        else if (fuel === 'gpl') fpPerLitre = 1.86;
        kmFp = consoKm * fpPerLitre;
        entPond = (((6036 * 1000000) * 0.07) / 44677000) / distance;
    }
    else if (motor === 'hybrid') {
        const consoKm = conso / 100;
        let fpPerLitre = 0;
        if (fuel === 'gazole') fpPerLitre = (3.1 + 3.04) / 2;
        else if (fuel === 'essence') fpPerLitre = 2.7;
        else if (fuel === 'bio') fpPerLitre = 1.11;
        else if (fuel === 'gpl') fpPerLitre = 1.86;
        kmFp = consoKm * fpPerLitre * 0.85;
        entPond = ((((6036 * 1000000) * 0.07) / 44677000) / distance) * 0.9;
    }
    else if (motor === 'electric') {
        if (type === 'small') kmFp = 0.0159;
        else if (type === 'medium') kmFp = 0.0198;
        else kmFp = 0.0273;
        entPond = ((((6036 * 1000000) * 0.07) / 44677000) / distance) * 0.75;
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
    let construct = 0
    if (motor === 'thermic') {
        if (type === 'small' || type === 'medium') construct = 6700;
        else if (type === 'berline' || type === 'vul' || type === 'suv') construct = 7600;    
    } else if (motor === 'hybrid') {
        if (type === 'small' || type === 'medium') construct = 9600;
        else if (type === 'berline' || type === 'vul' || type === 'suv') construct = 6900;
    } else if (motor === 'electric') {
        if (type === 'small' || type === 'medium') construct = 10200;
        else if (type === 'berline' || type === 'vul' || type === 'suv') construct = 20200;
    }
    return construct * amort;
}