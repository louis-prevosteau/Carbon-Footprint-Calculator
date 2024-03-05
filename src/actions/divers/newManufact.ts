export const getNewManufactsFootprint = (level: string) => {
    let coefPreserv = 0;
    switch (level) {
        case 'minimum':
            coefPreserv = 0.65;
            break;
        case 'medium':
            coefPreserv = 1;
            break;
        case 'maximum':
            coefPreserv = 1.5;
            break;
        default:
            break;
    }
    return (128.62 * coefPreserv).toFixed(2);
};