import Transports from 'components/Transports';
import React, { useState } from 'react';
import './i18n';
import Chart from 'components/Chart';
import PublicServices from 'components/PublicServices';
import Food from 'components/Food';

const App = () => {

  const [ state, setState] = useState(
    {
      sub: {
        transports: 0,
        food: 0,
        house: 0,
        divers: 0,
        publicServices: 0
      },
      footprint: 0
    }
  );

  const addFootprint = (paramName: keyof typeof state.sub, footprint: number) => {
    setState(prevState => {
        const newState = { ...prevState };
        newState.sub[paramName] = Number(footprint);
        return newState;
    });
    setState({
        ...state,
        footprint: Number(Object.values(state.sub).reduce((a, b) => a + b, 0))
    });
  };
  return (
    <div>
      <Chart data={Object.values(state.sub)}/>
      <Transports handleDataToChart={addFootprint}/>
      <Food handleDataToChart={addFootprint} />
      <PublicServices handleDataToChart={addFootprint}/>
    </div>
  );
};

export default App;