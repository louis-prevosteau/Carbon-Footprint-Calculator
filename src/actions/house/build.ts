export const getBuildFootprint = (
    people: number,
    age: number,
    surface: number
): number => {
    if (age < 50) return (surface * 8.5) / people;
    else return 0;
};
