export const getBuildFootprint = (
    people: number,
    age: number,
    surface: number,
    apartment: boolean
): number => {
    if (age < 50) {
        const yearBySurface = (apartment ? 525 : 425) / 50;
        return Number((surface * yearBySurface / people).toFixed(2))
    }
    else return 0;
};
