import { OUTSIDE_MATERIAL_FOOTPRINTS } from "utils/constants";

export const getOutsideFootprint = (people: number, outsideMaterial: OutsideMaterial) => {
    let res = 0;
    for (const material in outsideMaterial)
        if (outsideMaterial[material as keyof OutsideMaterial]) res += OUTSIDE_MATERIAL_FOOTPRINTS[material];
    return (res / people).toFixed(2);
};

interface OutsideMaterial {
    gardenLoungeWood: boolean;
    gardenLoungeIron: boolean;
    mowerElec: boolean;
    mower: boolean;
    barbecueElec: boolean;
    barbecue: boolean;
}