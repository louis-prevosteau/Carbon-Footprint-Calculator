import { HOME_APPLIANCE_AGE_1, HOME_APPLIANCE_AGE_2, HOME_APPLIANCE_AGE_3, HOME_APPLIANCE_AGE_4, HOME_APPLIANCE_FOOTPRINTS, PRESERV_FACTOR } from "utils/constants";

const getAge = (appliance: string): number => {
    switch (appliance) {
        case 'kettle':
        case 'coffeeMaker':
            return HOME_APPLIANCE_AGE_1;
        case 'vacuumCleaner':
        case 'cookingRobot':
            return HOME_APPLIANCE_AGE_2;
        case 'freezer':
        case 'fridge':
        case 'hood':
        case 'combinedFridge':
        case 'washingMachine':
        case 'dishwasher':
        case 'hotplates':
        case 'dryer':
            return HOME_APPLIANCE_AGE_3;
        case 'oven':
        case 'microwave':
            return HOME_APPLIANCE_AGE_4;
        default:
            return 0;
    }
}

export const getHomeAppliancesFootprint = (homeAppliances: HomeAppliances, people: number, preservation: string) => {
    if (preservation === '') return 0;
    let res = 0;
    for (const appliance in homeAppliances) {
        res += homeAppliances[appliance as keyof typeof homeAppliances] * (HOME_APPLIANCE_FOOTPRINTS[appliance as keyof typeof HOME_APPLIANCE_FOOTPRINTS] / (getAge(appliance) * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]));
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