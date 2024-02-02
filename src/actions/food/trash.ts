export const getTrashFootprint = (level: string, antiWaste = false, compost = false, stopPub = false, bulk = false): number => {
    if (level === 'zero') return 48.04;
    else return Number((194.49 + getTrashTips(antiWaste, compost, stopPub, bulk)).toFixed(2));
};

const getTrashTips = (antiWaste: boolean, compost: boolean, stopPub: boolean, bulk: boolean): number => {
    return Number(-(Number(antiWaste) * 30 + Number(stopPub) * 12.948 + Number(compost) * 11.01 + Number(bulk) * 4.67).toFixed(2));
};