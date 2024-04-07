import { MOTO_TYPES_FOOTPRINTS } from "utils/constants";

export const getMotoFootprint = (
    type: string,
    distance: number
) => {
    if (distance === 0) return 0;
    let res = 0;
    res += MOTO_TYPES_FOOTPRINTS[type as keyof typeof MOTO_TYPES_FOOTPRINTS];
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
    if (electricBike && eBikeDistance > 0) res += (0.00223 * eBikeDistance) + (262 / 12);
    if (other && otherDistance > 0) res += (0.002 * otherDistance) + (91.9 / 4);
    return res.toFixed(2);
};