export const getTrashFootprint = (level: string, antiWaste = false, compost = false, stopPub = false, bulk = false): number => {
    if (level === 'zero') return 48.04;
    else return Number((194.49 + getTrashTips(antiWaste, compost, stopPub, bulk)).toFixed(2));
};

const getTrashTips = (antiWaste: boolean, compost: boolean, stopPub: boolean, bulk: boolean): number => {
    let res = 0;
    if (antiWaste) res += 30;
    if (stopPub) res += 12.948;
    if (compost) res += 11.01;
    if (bulk) res += 4.67;
    return Number((-res).toFixed(2));
};