import { PRESERV_FACTOR } from "utils/constants";

export const getDevicesFootprint = (
    devices: TechDevices,
    preservation: string,
) => {
    let res = 0;
    const deviceFootprints: { [key: string]: number } = {
        camera: 30 / (5 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        houseVideoGame: 73.7 / (6.5 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        personalVideoGame: 30.8 / (6.5 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        bluetoothSpeaker: 8.98 / (5 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        vocalSpeaker: 30.7 / (5 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        homeCinema: 133 / (8 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        connectedWatch: 9.72 / (4 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        computer: 544 / (6 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        personalComputer: 156 / (3 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        pad: 63 / (3 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        phone: 57 / (2.5 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        tv: 371 / (8 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
        videoProjector: 94 / (5 * PRESERV_FACTOR[preservation as keyof typeof PRESERV_FACTOR]),
    };
    for (const device in devices) {
        res += devices[device as keyof typeof devices] * deviceFootprints[device];
    }
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