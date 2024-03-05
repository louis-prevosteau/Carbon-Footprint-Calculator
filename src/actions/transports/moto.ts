export const getMotoFootprint = (
    type: string,
    distance: number
) => {
    let res = 0;
    if (distance === 0)
        return 0;
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
    return res.toFixed(2);
};

export const getBikeFootprint = (
    bike = false,
    electricBike = false,
    other = false,
    eBikeDistance: number,
    otherDistance: number,

) => {
    let res = 0;
    if (bike) res += 9.7;
    if (electricBike && eBikeDistance > 0) res += eBikeDistance;
    if (other && otherDistance > 0) res += otherDistance;
    return res.toFixed(2);
};