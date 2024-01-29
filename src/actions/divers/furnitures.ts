export const getFurnituresFootprint = (
    furnitures: Furnitures,
    people: number,
    preservation: string,
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
    for (const furniture in furnitures) {
        switch (furniture) {
            case 'cupboard':
                res += furnitures[furniture] * (907 / (10 * coefPreserv));
                break;
            case 'couch':
                res += furnitures[furniture] * (186 / 10 * coefPreserv);
                break;  
            case 'bed':
                res += furnitures[furniture] * (87.43 / 10 * coefPreserv);
                break;
            case 'table':
                res += furnitures[furniture] * (60.1 / 10 * coefPreserv);
                break;
            case 'chair':
                res += furnitures[furniture] * (25.93 / 10 * coefPreserv);
                break;
            case 'mattress':
                res += furnitures[furniture] * (258.5 / 10 * coefPreserv);
                break;
            case 'littleFurniture':
                res += furnitures[furniture] * (9.17 / 10 * coefPreserv);
                break;
            case 'bigFurniture':
                res += furnitures[furniture] * (45.82 / 10 * coefPreserv);
                break;        
            default:
                break;
        }
    }
    return Number((res / people).toFixed(2));
};

interface Furnitures {
    cupboard: number;
    couch: number;
    mattress: number;
    bed: number;
    table: number;
    chair: number;
    littleFurniture: number;
    bigFurniture: number;
}