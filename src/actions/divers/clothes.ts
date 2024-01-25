export const calcClothesFootprint = (clothes: Clothes): number => {
    let res = 0;
    for (const garment in clothes) {
        switch (garment) {
            case 'shoes':
                res += clothes[garment] * 16.47;
                break;
            case 'tshirt':
                res += clothes[garment] * 5.35;
                break;
            case 'dress':
                res += clothes[garment] * 48.4;
                break;
            case 'shirt':
                res += clothes[garment] * 10.7;
                break;
            case 'sweat':
                res += clothes[garment] * 24.7;
                break;
            case 'short':
                res += clothes[garment] * 6.4;
                break;
            case 'woolenSweat':
                res += clothes[garment] * 39.2;
                break;
            case 'coat':
                res += clothes[garment] * 85.8;
                break;
            case 'pant':
                res += clothes[garment] * 23.2;
                break;
            case 'otherLittle':
                res += clothes[garment] * 5;
                break;
            case 'otherBig':
                res += clothes[garment] * 40;
                break;
            default:
                break;
        }
    }
    return Number(res.toFixed(2));
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