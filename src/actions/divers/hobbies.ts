export const getSportFootprint = (sports: Sports): number => {
    const sportsFootprints: Record<string, number> = {
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
    let res = 0;
    for (const sport in sports) {
        if (sports[sport as keyof Sports]) {
            res += sportsFootprints[sport];
        }
    }
    return res;
};

export const getCultureFootprint = (culture: Culture): number => {
    const cultureFootprints: Record<string, number> = {
        books: 50.22,
        museum: 2.3,
        music: 3.47,
        show: 29.17,
    };

    let res = 0;
    for (const type in culture) {
        if (culture[type as keyof Culture]) {
            res += cultureFootprints[type];
        }
    }

    return res;
};

interface Sports {
    externalSport: boolean;
    swimming: boolean;
    athletics: boolean;
    equestring: boolean;
    surfing: boolean;
    motors: boolean;
    ball: boolean
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