export const getBuildFootprint = (
    people: number,
    age: number,
    surface: number
): number => {
    if (age < 50) return Number(((surface * 8.5) / people).toFixed(2));
    else return 0;
};
