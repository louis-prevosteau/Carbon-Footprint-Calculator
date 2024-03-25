import { CONSOMABLE_FOOTPRINT_FACTOR } from "utils/constants";

export const getConsomableFootprint = (conso: string): number => {
    switch (conso) {
        case 'small':
            return CONSOMABLE_FOOTPRINT_FACTOR;
        case 'normal':
            return 2 * CONSOMABLE_FOOTPRINT_FACTOR;
        case 'high':
            return 5 * CONSOMABLE_FOOTPRINT_FACTOR;
        default:
            return 0;
    }
};