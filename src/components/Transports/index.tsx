import React, { useEffect, useState } from 'react';
import Car from './Car';
import Plane from './Plane';
import Moto from './Moto';
import Bus from './Bus';
import Metro from './Metro';
import Train from './Train';
import Bike from './Bike';
import Ferry from './Ferry';
import { Grid, Paper, Typography } from '@mui/material';
import CampingCar from './CampingCar';
import { useTranslation } from 'react-i18next';
import { blue, cyan } from '@mui/material/colors';
import Van from './Van';

const Transports = ({ people, handleDataToChart }: { people: number, handleDataToChart: any }) => {

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
            van: 0,
            campingCar: 0
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = Object.values(state).reduce((a, b) => a + b, 0);;
        handleDataToChart('transports', Number(footprint));
    }, [
        state.car,
        state.bus,
        state.bike,
        state.plane,
        state.train,
        state.metro,
        state.moto,
        state.ferry,
        state.van,
        state.campingCar]
    );

    const addFootprint = (paramName: keyof typeof state, footprint: number) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState[paramName] = Number(footprint);
            return newState;
        });
    };
    
    return (
        <Paper elevation={3} sx={{ border: '20px solid', borderColor: cyan[800], padding: '20px' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', pb: 5, color: blue['A200'], fontWeight: 'bold' }}>{t('transports.title')}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Car handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CampingCar people={people} handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Van people={people} handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Plane handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Moto handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Bus handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Metro handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Train handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Bike handleDataToTransport={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Ferry handleDataToTransport={addFootprint} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Transports;