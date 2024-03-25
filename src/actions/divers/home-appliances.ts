import { HOME_APPLIANCE_AGE_1, HOME_APPLIANCE_AGE_2, HOME_APPLIANCE_AGE_3, HOME_APPLIANCE_AGE_4, PRESERV_FACTOR } from "utils/constants";

const getHomeApplianceFootprint = (appliance: string, quantity: number, coefPreserv: number) => {
    let factor = 0;
    switch (appliance) {
        case 'vacuumCleaner':
        case 'hood':
        case 'cookingRobot':
            factor = HOME_APPLIANCE_AGE_1;
            break;
        case 'kettle':
        case 'coffeeMaker':
        case 'dishwasher':
        case 'dryer':
        case 'microwave':
        case 'hotplates':
            factor = HOME_APPLIANCE_AGE_2;
            break;
        case 'freezer':
        case 'fridge':
        case 'combinedFridge':
        case 'washingMachine':
            factor = HOME_APPLIANCE_AGE_3;
            break;
        case 'oven':
            factor = HOME_APPLIANCE_AGE_4;
            break;
        default:
            break;
    }
    return (factor * quantity / (appliance === 'vacuumCleaner' ? 1 : coefPreserv));
}

export const getHomeAppliancesFootprint = (homeAppliances: HomeAppliances, people: number, preservation: string) => {
    let res = 0;
    for (const appliance in homeAppliances) {
        res += getHomeApplianceFootprint(appliance, homeAppliances[appliance as keyof typeof homeAppliances], PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]);
    }
    return (res / people).toFixed(2);
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