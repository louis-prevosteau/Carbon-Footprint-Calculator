export const getOutsideFootprint = (people: number, outsideMaterial: OutsideMaterial): number => {
    let res = 0;
    if (outsideMaterial.barbecue) res += 108.97;
    if (outsideMaterial.barbecueElec) res += 5.44;
    if (outsideMaterial.gardenLoungeWood) res += 6.92;
    if (outsideMaterial.gardenLoungeIron) res += 24.9;
    if (outsideMaterial.mower) res += 45.2
    if (outsideMaterial.mowerElec) res += 8.96;    
    return Number((res / people).toFixed(2));
};

interface OutsideMaterial {
    gardenLoungeWood: boolean;
    gardenLoungeIron: boolean;
    mowerElec: boolean;
    mower: boolean;
    barbecueElec: boolean;
    barbecue: boolean;
}