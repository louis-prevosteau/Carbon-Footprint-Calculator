export const LEVELS = ['never', 'sometimes', 'often', 'always'];
export const MILKS = {
    cow: {
        breakfast: 0.47,
        hotDrink: 1.32
    },
    soy: {
        breakfast: 0.29,
        hotDrink: 0.44
    },
    oat: {
        breakfast: 0.312,
        hotDrink: 0.54
    }
};
export const BREAKFASTS = ['british', 'continental', 'milk', 'vegan'];
export const TRASH_LEVELS = ['base', 'reduction', 'zero'];
export const CAR_TYPES = ['small', 'medium', 'berline', 'vul', 'suv'];
export const CAR_MOTORS = ['thermic', 'hybrid', 'electric'];
export const CAR_FUELS = ['essence', 'bio', 'gazole', 'gpl'];
export const MOTO_TYPES_FOOTPRINTS = {
    thermic: 0.08,
    electric: 0.03,
    inf250: 0.08,
    sup250: 0.19
};
export const WOOD_TYPES = ['log', 'pellets'];
export const LOCATIONS = ['mediterranean', 'atlantic', 'mountain', 'city', 'country'];
export const SEASONS = ['summer', 'summer+', 'winter', 'winter+'];
export const FUEL_FP_PER_LITER = {
    gazole: (3.1 + 3.04) / 2,
    essence: 2.7,
    bio: 1.11,
    gpl: 1.86
}
export const EMISION_PER_KILOMETER = {
    thermic: 0.13,
    hybrid: 0.11,
    electric: 0.03,
};
export const LUNCHES = {
    vegan: {
        footprint: 0.785,
        localPart: 0.12
    },
    vegetarian: {
        footprint: 1.115,
        localPart: 0.08
    },
    meat1: {
        footprint: 2.1,
        localPart: 0.03
    },
    meat2: {
        footprint: 5.51,
        localPart: 0.01
    },
    fish1: {
        footprint: 1.63,
        localPart: 0.05
    },
    fish2: {
        footprint: 2.37,
        localPart: 0.06
    },
};
export const HOT_DRINKS_FOOTPRINTS = {
    coffee: 10.09 * 0.012,
    tea: (0.04 * (1 - 0.25)) * 0.25,
    chocolate: (27.06 * 0.02),
    chicory: 5.43 * 0.03
};
export const HOLIDAYS_FOOTPRINTS = {
    hotel: 6.93,
    camping: 1.4,
    youthHotel: 1.16,
    homeRental: 5.8,
    familly: 0,
    homeExchange: 3.52
};
export const SEASON_FACTORS = {
    mediterranean: {
        'summer': 0,
        'summer+': 0.13,
        'winter': 1.41,
        'winter+': 1.62
    },
    mountain: {
        'summer': 0.06,
        'summer+': 0.76,
        'winter': 2.68,
        'winter+': 2.15
    },
    default: {
        'summer': 0.06,
        'summer+': 0.46,
        'winter': 2.26,
        'winter+': 1.71
    }
};
export const CLOTHES_FOOTPRINTS = {
    shoes: 16.47,
    tshirt: 5.35,
    dress: 48.4,
    shirt: 10.7,
    sweat: 24.7,
    short: 6.4,
    woolenSweat: 39.2,
    coat: 85.8,
    pant: 23.2,
    otherLittle: 5,
    otherBig: 40,
};
export const CONSOMABLE_CONSO = {
    small: 1,
    normal: 2,
    high: 5
};
export const CONSOMABLE_FOOTPRINT_FACTOR = 1.09 * 12;
export const SPORTS_FOOTPRINTS: Record<string, number> = {
    athletics: 88.7,
    ball: 88.7,
    bodybuilding: 72.8,
    equestring: 88.7,
    externalSport: 24.9,
    golf: 88.7,
    martial: 88.7,
    motors: 88.7,
    other: 88.7,
    surfing: 88.7,
    swimming: 88.7,
    winter: 138.7,
};
export const CULTURE_FOOTPRINTS: Record<string, number> = {
    books: 50.22,
    museum: 2.3,
    music: 3.47,
    show: 29.17,
};
export const PRESERV_FACTOR = {
    new: 1 / 2,
    minimum: 2 / 3,
    medium: 1,
    maximum: 4 / 3
};
export const FURNITURE_FOOTPRINTS = {
    cupboard: 907,
    couch: 186,
    bed: 87.43,
    table: 60.1,
    chair: 25.93,
    mattress: 258.5,
    littleFurniture: 9.17,
    bigFurniture: 45.82,
};
export const FURNITURE_AGE = 10;
export const HOME_APPLIANCES = {
    vacuumCleaner: {
        footprint: 52.4,
        age: 8
    },
    kettle: {
        footprint: 9.9,
        age: 6
    },
    coffeeMaker: {
        footprint: 31.9,
        age: 6
    },
    freezer: {
        footprint: 415,
        age: 10
    },
    oven: {
        footprint: 217,
        age: 12
    },
    hood: {
        footprint: 60.4,
        age: 10
    },
    fridge: {
        footprint: 128.5,
        age: 10
    },
    combinedFridge: {
        footprint: 257,
        age: 10
    },
    washingMachine: {
        footprint: 342,
        age: 10
    },
    dishwasher: {
        footprint: 271,
        age: 10
    },
    dryer: {
        footprint: 266,
        age: 10
    },
    cookingRobot: {
        footprint: 41.3,
        age: 8
    },
    microwave: {
        footprint: 98.4,
        age: 12
    },
    hotplates: {
        footprint: 65.3,
        age: 10
    }
};
export const TECH_DEVICES = {
    camera: {
        footprint: 30,
        age: 5
    },
    houseVideoGame: {
        footprint: 73.7,
        age: 6.5
    },
    personalVideoGame: {
        footprint: 30.8,
        age: 6.5
    },
    bluetoothSpeaker: {
        footprint: 8.98,
        age: 5
    },
    vocalSpeaker: {
        footprint: 30.7,
        age: 5
    },
    homeCinema: {
        footprint: 133,
        age: 8
    },
    connectedWatch: {
        footprint: 9.72,
        age: 4
    },
    computer: {
        footprint: 544,
        age: 6
    },
    personalComputer: {
        footprint: 156,
        age: 3
    },
    pad: {
        footprint: 63,
        age: 3
    },
    phone: {
        footprint: 57,
        age: 2.5
    },
    tv: {
        footprint: 371,
        age: 8
    },
    videoProjector: {
        footprint: 94,
        age: 5
    }
};
export const NEW_MANUFACT_LEVELS = {
    minimum: 0.65,
    medium: 1,
    maximum: 1.5
};
export const PET_FOOTPRINTS = {
    littleDog: 128.27,
    mediumDog: 357.47,
    bigDog: 598.65,
    cat: 54.94,
};
export const OUTSIDE_MATERIAL_FOOTPRINTS: Record<string, number> = {
    barbecue: 108.97,
    barbecueElec: 5.44,
    gardenLoungeWood: 6.92,
    gardenLoungeIron: 24.9,
    mower: 45.2,
    mowerElec: 8.96
};