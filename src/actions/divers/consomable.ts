import { CONSOMABLE_CONSO, CONSOMABLE_FOOTPRINT_FACTOR } from "utils/constants";

export const getConsomableFootprint = (conso: string): number => {
    return CONSOMABLE_CONSO[conso as keyof typeof  CONSOMABLE_CONSO] * CONSOMABLE_FOOTPRINT_FACTOR;
};