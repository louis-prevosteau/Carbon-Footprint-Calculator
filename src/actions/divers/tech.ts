export const getDevicesFootprint = (
    devices: TechDevices,
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
    for (const device in devices) {
        switch (device) {
            case 'camera':
                res += (devices[device] * 30) / (5 * coefPreserv);
                break;
            case 'houseVideoGame':
                res += (devices[device] * 73.7) / (6.5 * coefPreserv);
                break;  
            case 'personalVideoGame':
                res += (devices[device] * 30.8) / (6.5 * coefPreserv);
                break;
            case 'bluetoothSpeaker':
                res += (devices[device] * 8.98) / (5 * coefPreserv);
                break;
            case 'vocalSpeaker':
                res += (devices[device] * 30.7) / (5 * coefPreserv);
                break;
            case 'homeCinema':
                res += (devices[device] * 133) / (8 * coefPreserv);
                break;
            case 'connectedWatch':
                res += (devices[device] * 9.72) / (4 * coefPreserv);
                break;
            case 'computer':
                res += (devices[device] * 544) / (6 * coefPreserv);
                break;
            case 'personalComputer':
                res += (devices[device] * 156) / (3 * coefPreserv);
                break; 
            case 'pad':
                res += (devices[device] * 63) / (3 * coefPreserv);
                break;   
            case 'phone':
                res += (devices[device] * 57) / (2.5 * coefPreserv);
                break;   
            case 'tv':
                res += (devices[device] * 371) / (8 * coefPreserv);
                break; 
            case 'videoProjector':
                res += (devices[device] * 94) / (5 * coefPreserv);
                break;     
            default:
                break;
        }
    }
    return res;
};

export const getStreamingFootprint = (duration: number): number => {
    return 0.004 * duration * 365;
};

interface TechDevices {
    camera: number;
    houseVideoGame: number;
    personalVideoGame: number;
    bluetoothSpeaker: number;
    vocalSpeaker: number;
    homeCinema: number;
    connectedWatch: number;
    computer: number
    personalComputer: number;
    pad: number;
    phone: number;
    tv: number;
    videoProjector: number;
}