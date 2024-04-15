import { CULTURE_FOOTPRINTS, SPORTS_FOOTPRINTS } from "utils/constants";

export const getSportFootprint = (sports: Sports) => {
    let res = 0;
    for (const sport in sports)
        if (sports[sport as keyof Sports]) res += SPORTS_FOOTPRINTS[sport];
    return res.toFixed(2);
};

export const getCultureFootprint = (culture: Culture) => {
    let res = 0;
    for (const type in culture) 
        if (culture[type as keyof Culture]) res += CULTURE_FOOTPRINTS[type];
    return res.toFixed(2);
};

interface Sports {
    externalSport: boolean;
    swimming: boolean;
    athletics: boolean;
    equestring: boolean;
    surfing: boolean;
    motors: boolean;
    ball: boolean;
    martial: boolean;
    bodybuilding: boolean;
    golf: boolean;
    winter: boolean;
    other: boolean;
}

interface Culture {
    show: boolean;
    museum: boolean;
    books: boolean;
    music: boolean;
}