import React, { useState } from 'react';
import Car from './Car';
import Plane from './Plane';
import Moto from './Moto';
import Bus from './Bus';
import Metro from './Metro';
import Train from './Train';
import Bike from './Bike';
import Ferry from './Ferry';

const Transports = () => {

    const [state, setState] = useState(
        {
            footprint: 0
        }
    );

    const addFootprint = (footprint: number) => {
        setState({ footprint: state.footprint + footprint });
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