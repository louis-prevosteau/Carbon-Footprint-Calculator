export const getBuildFootprint = (
    people: number,
    age: number,
    surface: number
) => {
    if (age < 50) return (surface * 8.5 / people).toFixed(2);
    else return 0;
};
