import { Grid, Paper, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Clothes from './Clothes';
import Furnitures from './Furnitures';
import HomeAppliances from './HomeAppliances';
import TechDevices from './TechDevices';
import Streaming from './Streaming';
import Consomable from './Consomable';
import NewManufacts from './NewManufacts';
import Smoking from './Smoking';
import Sports from './Sports';
import Culture from './Culture';
import Pets from './Pets';

const Divers = ({ people, handleDataToChart }: { people: number, handleDataToChart: any }) => {

    const [state, setState] = useState(
        {
            clothes: 0,
            consomable: 0,
            furnitures: 0,
            sport: 0,
            culture: 0,
            homeAppliances: 0,
            newManufacts: 0,
            pets: 0,
            smoking: 0,
            techDevices: 0,
            streaming: 0
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = Number(Object.values(state).reduce((a, b) => a + b, 0));
        handleDataToChart('divers', footprint);
    }, [
        state.clothes,
        state.consomable,
        state.culture,
        state.furnitures,
        state.homeAppliances,
        state.newManufacts,
        state.pets,
        state.smoking,
        state.sport,
        state.streaming,
        state.techDevices
    ]);

    const addFootprint = (paramName: keyof typeof state, footprint: number) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState[paramName] = Number(footprint);
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ border: '20px solid', borderColor: purple[300], padding: '20px' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', pb: 5, color: purple['A200'], fontWeight: 'bold' }}>{t('divers.title')}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6} sm={12}>
                    <Clothes handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={6} sm={12}>
                    <Furnitures people={people} handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={6} sm={12}>
                    <HomeAppliances people={people} handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={6} sm={12}>
                    <TechDevices handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={2} sm={12}>
                    <Streaming handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={4} sm={12}>
                    <Consomable handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={4} sm={12}>
                    <NewManufacts handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={2} sm={12}>
                    <Smoking handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={12} sm={12}>
                    <Sports handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={6} sm={12}>
                    <Culture handleDataToDivers={addFootprint} />
                </Grid>
                <Grid item xs={12} lg={6} sm={12}>
                    <Pets handleDataToDivers={addFootprint} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Divers;