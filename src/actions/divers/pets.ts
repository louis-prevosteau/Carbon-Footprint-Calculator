export const calcPetsFootprint = (pets: Pets): number => {
    let res = 0;
    for (const pet in pets) {
        switch (pet) {
            case 'littleDog':
                res += pets[pet] * 128.27;
                break;
            case 'mediumDog':
                res += pets[pet] * 357.47;
                break;
            case 'bigDog':
                res += pets[pet] * 598.65;
                break;
            case 'cat':
                res += pets[pet] * 54.94;
                break;
            default:
                break;
        }
    }
    return Number(res.toFixed(2));
};

interface Pets {
    littleDog: number;
    mediumDog: number;
    bigDog: number;
    cat: number;
}