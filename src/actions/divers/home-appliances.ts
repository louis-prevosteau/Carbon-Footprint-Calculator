import { HOME_APPLIANCES, PRESERV_FACTOR } from "utils/constants";

export const getHomeAppliancesFootprint = (homeAppliances: HomeAppliances, people: number, preservation: string) => {
    if (preservation === '') return 0;
    let res = 0;
    for (const appliance in homeAppliances) {
        res += homeAppliances[appliance as keyof typeof homeAppliances] * (HOME_APPLIANCES[appliance as keyof typeof HOME_APPLIANCES].footprint / (HOME_APPLIANCES[appliance as keyof typeof HOME_APPLIANCES].age * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]));
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