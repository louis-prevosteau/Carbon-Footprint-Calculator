import { CONSOMABLE_CONSO, CONSOMABLE_FOOTPRINT_FACTOR } from "utils/constants";

export const getConsomableFootprint = (conso: string): number => {
    if (conso === '') return 0;
    return CONSOMABLE_CONSO[conso as keyof typeof  CONSOMABLE_CONSO] * CONSOMABLE_FOOTPRINT_FACTOR;
};