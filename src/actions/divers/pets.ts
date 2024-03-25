import { PET_FOOTPRINTS } from "utils/constants";

export const getPetsFootprint = (pets: Pets) => {
    return Object.values(pets)
      .reduce((acc, petCount) => acc + petCount * PET_FOOTPRINTS[Object.keys(PET_FOOTPRINTS)[0]as keyof typeof PET_FOOTPRINTS], 0)
      .toFixed(2);
  };

interface Pets {
    littleDog: number;
    mediumDog: number;
    bigDog: number;
    cat: number;
}