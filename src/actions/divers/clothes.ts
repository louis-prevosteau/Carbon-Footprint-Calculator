import { CLOTHES_FACTORS } from "utils/constants";

export const getClothesFootprint = (clothes: Clothes) => {
    let res = 0;
    for (const garment in clothes) {
        if (CLOTHES_FACTORS.hasOwnProperty(garment)) {
            res += clothes[garment as keyof typeof clothes] * CLOTHES_FACTORS[garment as keyof typeof CLOTHES_FACTORS];
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