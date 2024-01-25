export const calcConsomableFootprint = (conso: string): number => {
    switch (conso) {
        case 'small':
            return 1.09 * 12;
        case 'normal':
            return 2 * 1.09 * 12;
        case 'high':
            return 5 * 1.09 * 12;
        default:
            return 0;
    }
};