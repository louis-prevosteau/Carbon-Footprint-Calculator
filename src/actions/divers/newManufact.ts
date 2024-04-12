import { NEW_MANUFACT_LEVELS } from "utils/constants";

export const getNewManufactsFootprint = (level: string) => {
    return level === '' ? 0 : (123.01 * NEW_MANUFACT_LEVELS[level as keyof typeof NEW_MANUFACT_LEVELS]).toFixed(2);
};