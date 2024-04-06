import { FURNITURE_AGE, FURNITURE_FOOTPRINTS, PRESERV_FACTOR } from "utils/constants";

export const getFurnituresFootprint = (
    furnitures: Furnitures,
    people: number,
    preservation: string,
) => {
    if (preservation === '') return 0;
    let res = 0;
    for (const furniture in furnitures) {
        res += furnitures[furniture as keyof typeof furnitures] * (FURNITURE_FOOTPRINTS[furniture as keyof typeof FURNITURE_FOOTPRINTS] / (FURNITURE_AGE * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]));
    }
    return (res / people).toFixed(2);
};

interface Furnitures {
    cupboard: number;
    couch: number;
    mattress: number;
    bed: number;
    table: number;
    chair: number;
    littleFurniture: number;
    bigFurniture: number;
}