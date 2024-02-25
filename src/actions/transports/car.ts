export const getCarFootprint = (
    distance: number,
    sameCar: boolean,
    type: string,
    motor: string,
    people: number,
    recent: boolean,
    fuel: string,
    conso: number): number => {
    let res = 0;
    if (distance === 0)
        return 0;
    else {
        res += distance * 0.19;
        if (!sameCar) res += 203.9;
        getType(res, type);
        res += 0.16 * distance / people;
        getMotor(res, type, motor, recent);
        if (motor === 'thermic') getFuel(res, fuel, conso);
        return Number(res.toFixed(2));
    }
};

export const getVanFootprint = (
    distance: number,
    conso: number
): number => {
    return Number(((conso / 100) * distance).toFixed(2));
};

export const getCaravanFootprint = (
    people: number,
    distance: number,
    motor: string
): number => {
    let kiloFp = 0;
    switch (motor) {
        case 'thermic':
            kiloFp = 0.13;
            break;
        case 'hybrid':
            kiloFp = 0.11;
            break;
        case 'electric':
            kiloFp = 0.03;
            break;
        default:
            break;
    }
    const surconso = kiloFp * 0.25
    const usage = (surconso * distance) / people;
    const construction = (3800 * 25) / people;
    return Number((usage + construction).toFixed(2));
};

export const getCampingCarFootprint = (
    distance: number,
    conso: number
): number => {
    return Number(((conso / 100) * distance).toFixed(2));
};

const getType = (base: number, type: string): void => {
    switch (type) {
        case 'small':
            base += 6625;
            break;
        case 'medium':
            base += 7075;
            break;
        case 'vul':
            base += 7150;
            break;
        case 'berline':
            base += 7600;
            break;
        case 'suv':
            base += 8050;
            break;
        default:
            base += 7600;
            break;
    }
}

const getMotor = (base: number, type: string, motor: string, recent: boolean): void => {
    switch (motor) {
            case 'thermic':
                if (type === 'small' || type === 'medium')
                    base += 6700;
                else if (type === 'berline' || type === 'vul' || type === 'suv')
                    base += 7600;
                break;
            case 'hybrid':
                if (type === 'small' || type === 'medium')
                    base += 9600;
                else if (type === 'berline' || type === 'vul' || type === 'suv')
                    base += 6900;
                break;
            case 'electric':
                if (type === 'small' || type === 'medium')
                    base += 10200;
                else if (type === 'berline' || type === 'vul' || type === 'suv')
                    base += 20200;
                break;
            default:
                break;
        }
        if (recent) base *= (1 / 10)
}

const getFuel = (base: number, fuel: string, conso: number): void => {
    switch (fuel) {
        case 'gazole':
            base += (conso / 100) * 3.04;
            break;
        case 'essence':
            base += (conso / 100) * 2.7;
            break;
        case 'bio':
            base += (conso / 100) * 1.1;
            break;
        default:
            break;
    }
}