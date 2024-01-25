export const calcSportFootprint = (sports: Sports): number => {
    let res = 0;
    if (sports.athletics) res += 88.7;   
    if (sports.ball) res += 88.7;
    if (sports.bodybuilding) res += 72.8;
    if (sports.equestring) res += 88.7;
    if (sports.externalSport) res += 24.9
    if (sports.golf) res += 88.7;
    if (sports.martial) res += 88.7;
    if (sports.motors) res += 88.7;
    if (sports.other) res += 88.7;
    if (sports.surfing) res += 88.7;
    if (sports.swimming) res += 88.7;
    if (sports.winter) res += 138.7;
    return Number(res.toFixed(2));
};

export const calcCultureFootprint = (culture: Culture): number => {
    let res = 0;
    if (culture.books) res += 50.22 ;
    if (culture.museum) res += 2.3;
    if (culture.music) res += 3.47;
    if (culture.show) res += 29.17;    
    return Number(res.toFixed(2));
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