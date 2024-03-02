import React, { useEffect, useState } from 'react';
import Car from './Car';
import Plane from './Plane';
import Moto from './Moto';
import Bus from './Bus';
import Metro from './Metro';
import Train from './Train';
import Bike from './Bike';
import Ferry from './Ferry';

const Transports = ({ handleDataToChart }: { handleDataToChart: any }) => {

    const [state, setState] = useState(
        {
            car: 0,
            plane: 0,
            train: 0,
            moto: 0,
            metro: 0,
            bus: 0,
            bike: 0,
            ferry: 0,
        }
    );

    useEffect(() => {
        const footprint = state.car + state.plane + state.train + state.moto + state.metro + state.bike + state.ferry;
        console.log(footprint);
        handleDataToChart('transports', Number(footprint));
    }, [state.car, state.bus, state.bike, state.plane, state.train, state.metro, state.moto, state.ferry]);

    const addFootprint = (paramName: keyof typeof state, footprint: number) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState[paramName] = Number(footprint);
            return newState;
        });
    };
    
    return (
        <div>
            <Car handleDataToTransport={addFootprint} />
            <Plane handleDataToTransport={addFootprint} />
            <Moto handleDataToTransport={addFootprint} />
            <Bus handleDataToTransport={addFootprint} />
            <Metro handleDataToTransport={addFootprint} />
            <Train handleDataToTransport={addFootprint} />
            <Bike handleDataToTransport={addFootprint} />
            <Ferry handleDataToTransport={addFootprint} />
        </div>
    );
};

export default Transports;