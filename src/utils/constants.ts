export const LEVELS = ['never', 'sometimes', 'often', 'always'];
export const MILKS = ['cow', 'soy', 'oat'];
export const BREAKFASTS = ['british', 'continental', 'milk', 'vegan'];
export const TRASH_LEVELS = ['base', 'reduction', 'zero'];
export const CAR_TYPES = ['small', 'medium', 'berline', 'vul', 'suv'];
export const CAR_MOTORS = ['thermic', 'hybrid', 'electric'];
export const CAR_FUELS = ['essence', 'bio', 'gazole', 'gpl'];
export const MOTO_TYPES = ['thermic', 'electric', 'inf250', 'sup250'];
export const WOOD_TYPES = ['log', 'pellets'];
export const LOCATIONS = ['mediterranean', 'atlantic', 'mountain', 'city', 'country'];
export const SEASONS = ['summer', 'summer+', 'winter', 'winter+'];

export const CLOTHES_FACTORS = {
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
export const HOME_APPLIANCE_AGE_1 = 8;
export const HOME_APPLIANCE_AGE_2 = 6;
export const HOME_APPLIANCE_AGE_3 = 10;
export const HOME_APPLIANCE_AGE_4 = 12;
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
    mowerElec: 8.96,};