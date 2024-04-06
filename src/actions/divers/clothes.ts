import { CLOTHES_FOOTPRINTS } from "utils/constants";

export const getClothesFootprint = (clothes: Clothes) => {
    let res = 0;
    for (const garment in clothes) {
        if (CLOTHES_FOOTPRINTS.hasOwnProperty(garment)) {
            res += clothes[garment as keyof typeof clothes] * CLOTHES_FOOTPRINTS[garment as keyof typeof CLOTHES_FOOTPRINTS];
        }
    }
    return res.toFixed(2);
};

interface Clothes {
    shoes: number;
    tshirt: number;
    dress: number;
    shirt: number;
    sweat: number;
    short: number;
    woolenSweat: number;
    coat: number;
    pant: number;
    otherLittle: number;
    otherBig: number;
}