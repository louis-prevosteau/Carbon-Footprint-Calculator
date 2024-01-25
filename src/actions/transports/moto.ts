export const calcMotoFootprint = (
    type: string,
    distance: number
): number => {
    let res = 0;
    switch (type) {
        case 'thermic':
            res += distance * 0.08;
            break;
        case 'electric':
            res += distance * 0.03;
            break;
        case 'inf250':
            res += distance * 0.08;
            break;
        case 'sup250':
            res += distance * 0.19;
            break;
        default:
            break;
    }
    return Number(res.toFixed(2));
};

export const calcBikeFootprint = (
    bike = false,
    electricBike = false,
    other = false,
    eBikeDistance?: number,
    otherDistance?: number,

): number => {
    let res = 0;
    if (bike) res += 9.7;
    if (electricBike && eBikeDistance) calcElectricBikeFootprint(res, eBikeDistance);
    if (other && otherDistance) calcOtherFootprint(res, otherDistance);
    return Number(res.toFixed(2));
};

const calcElectricBikeFootprint = (base: number, distance: number): void => {
    base += distance * 0.00223;
}

const calcOtherFootprint = (base: number, distance: number): void => {
    base += distance * 0.002;
}