import { PRESERV_FACTOR, TECH_DEVICES } from "utils/constants";

export const getTechDevicesFootprint = (
    devices: TechDevices,
    preservation: string,
) => {
    if (preservation === '') return 0;
    let res = 0;
    for (const device in devices) res += devices[device as keyof typeof devices] * (TECH_DEVICES[device as keyof typeof TECH_DEVICES].footprint / (TECH_DEVICES[device as keyof typeof TECH_DEVICES].age * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]));
    return res.toFixed(2);
};

export const getStreamingFootprint = (duration: number) => {
    return (0.004 * duration * 365).toFixed(2);
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