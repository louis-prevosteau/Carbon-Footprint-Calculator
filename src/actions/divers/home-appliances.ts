export const getHomeAppliancesFootprint = (
    homeAppliances: HomeAppliances,
    people: number,
    preservation: string
): number => {
    let res = 0;
    let coefPreserv = 0;
    switch (preservation) {
        case 'new':
            coefPreserv = 1 / 2;
            break;
        case 'minimum':
            coefPreserv = 2 /3;
            break;
        case 'medium':
            coefPreserv = 1;
            break;
        case 'maximum':
            coefPreserv = 4 / 3;
            break;
        default:
            break;
    }
    for (const appliance in homeAppliances) {
        switch (appliance) {
            case 'vacuumCleaner':
                res += (52.4 / (8 * coefPreserv)) * homeAppliances[appliance];
                break;    
            case 'kettle':
                res += (9.9 / (6 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'coffeeMaker':
                res += (31.9 / (6 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'freezer':
                res += (415 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'oven':
                res += (217 / (12 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'hood':
                res += (60.4 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'fridge':
                res += (87.6 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'combinedFridge':
                res += (257 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'washingMachine':
                res += (342 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'dishwasher':
                res += (271 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'dryer':
                res += (266 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'cookingRobot':
                res += (41.3 / (8 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'microwave':
                res += (98.4 / (12 * coefPreserv)) * homeAppliances[appliance];
                break;
            case 'hotplates':
                res += (65.3 / (10 * coefPreserv)) * homeAppliances[appliance];
                break;    
            default:
                break;
        }
    }
    return res / people;
};

interface HomeAppliances {
    vacuumCleaner: number;
    kettle: number;
    coffeeMaker: number;
    freezer: number;
    oven: number;
    hood: number;
    fridge: number;
    combinedFridge: number;
    washingMachine: number;
    dishwasher: number;
    dryer: number;
    cookingRobot: number;
    microwave: number;
    hotplates: number;
}