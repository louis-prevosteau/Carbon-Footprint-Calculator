export const getOutsideFootprint = (people: number, outsideMaterial: OutsideMaterial): number => {
    const materialFootprints: Record<string, number> = {
        barbecue: 108.97,
        barbecueElec: 5.44,
        gardenLoungeWood: 6.92,
        gardenLoungeIron: 24.9,
        mower: 45.2,
        mowerElec: 8.96,
    };
    let res = 0;
    for (const material in outsideMaterial) {
        if (outsideMaterial[material as keyof OutsideMaterial]) {
            res += materialFootprints[material];
        }
    }   
    return res / people;
};

interface OutsideMaterial {
    gardenLoungeWood: boolean;
    gardenLoungeIron: boolean;
    mowerElec: boolean;
    mower: boolean;
    barbecueElec: boolean;
    barbecue: boolean;
}