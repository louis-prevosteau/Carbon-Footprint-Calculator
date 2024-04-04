import Transports from 'components/Transports';
import React, { useState } from 'react';
import './i18n';
import DetailsChart from 'components/DetailsChart';
import PublicServices from 'components/PublicServices';
import Food from 'components/Food';
import House from 'components/House';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { indigo } from '@mui/material/colors';
import GlobalChart from 'components/GlobalChart';
import Divers from 'components/Divers';

const App = () => {

  const [ state, setState] = useState(
    {
      params: {
        people: 0
      },
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
  const { t } = useTranslation();

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

  const setPeople = (people: number) => {
    setState({ ...state, params: {...state.params, people } });
  };

  return (
    <div>
      <Typography variant='h2' textAlign='center' fontWeight='medium' color={indigo[900]}>{t('title')}</Typography>
      <Grid container justifyContent='center' alignItems='center' pb={2}>
        <DetailsChart data={Object.values(state.sub)}/>
        <GlobalChart footprint={Object.values(state.sub).reduce((a, b) => a + b, 0)} />
      </Grid>
      <House setPeople={setPeople} handleDataToChart={addFootprint} />
      <Transports people={state.params.people} handleDataToChart={addFootprint}/>
      <Food handleDataToChart={addFootprint} />
      <Divers people={state.params.people} handleDataToChart={addFootprint} />
      <PublicServices handleDataToChart={addFootprint}/>
    </div>
  );
};

export default App;