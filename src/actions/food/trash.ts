export const getTrashFootprint = (level: string, antiWaste: boolean, compost: boolean, stopPub: boolean, bulk: boolean): number => {
    if (level === 'zero') return 48.04;
    else return 194.49 + getTrashTips(antiWaste, compost, stopPub, bulk);
};

const getTrashTips = (antiWaste: boolean, compost: boolean, stopPub: boolean, bulk: boolean): number => {
    const tips = [
      { condition: antiWaste, impact: 30 },
      { condition: compost, impact: 11.01 },
      { condition: stopPub, impact: 12.948 },
      { condition: bulk, impact: 4.67 },
    ];
    const res = tips.reduce((total, tip) => {
      return total - (Number(tip.condition) * tip.impact);
    }, 0);
    return res;
};