import { Grid, Paper, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Trash from './Trash';
import Lunch from './Lunch';
import Breakfast from './Breakfast';
import Local from './Local';
import Season from './Season';
import Alcool from './Alcool';
import HotDrinks from './HotDrinks';
import WaterBottle from './WaterBottle';
import Sodas from './Sodas';

const Food = ({ handleDataToChart }: { handleDataToChart: any }) => {

    const [state, setState] = useState(
        {
            sub: {
                lunch: 0,
                breakfast: 0,
                drink: 0,
                trash: 0,
                local: 0,
                season: 0,
                alcool: 0,
                hotDrinks: 0,
                waterBottle: 0,
                sodas: 0
            },
            lunches: {
                vegan: 0,
                vegetarian: 0,
                meat1: 0,
                meat2: 0,
                fish1: 0,
                fish2: 0
            },
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = Object.values(state.sub).reduce((a, b) => a + b, 0);
        handleDataToChart('food', footprint);
    }, [
        state.sub.drink,
        state.sub.lunch,
        state.sub.breakfast,
        state.sub.trash,
        state.sub.local,
        state.sub.season,
        state.sub.hotDrinks,
        state.sub.waterBottle,
        state.sub.sodas]
    );
    
    const updateLunchParams = (params: any) => {
        setState(prevState => {
            const newState = { ...prevState, lunches: params };
            return newState;
        });
    };

    const addFootprint = (paramName: keyof typeof state.sub, footprint: number) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.sub[paramName] = Number(footprint);
            return newState;
        });
    };


    return (
        <Paper elevation={3} sx={{ border: '20px solid', borderColor: amber[600], padding: '20px' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', pb: 5, color: amber[800], fontWeight: 'bold' }}>{t('food.title')}</Typography>
            <Grid container spacing={2}>
                <Grid item lg={6} xs={12} sm={3}>
                    <Lunch handleDataToFood={addFootprint} updateLunchParams={updateLunchParams} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Breakfast handleDataToFood={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Trash handleDataToFood={addFootprint} />
                </Grid> 
                <Grid item xs={12} sm={3}>
                    <Local lunches={state.lunches} breakfastFP={state.sub.breakfast} handleDataToFood={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Season handleDataToFood={addFootprint} lunchFP={state.sub.lunch} breakfastFP={state.sub.breakfast} />
                </Grid>
                <Grid item lg={6} xs={12} sm={3}>
                    <HotDrinks handleDataToFood={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <WaterBottle handleDataToFood={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Sodas handleDataToFood={addFootprint} />
                </Grid>            
                <Grid item xs={12} sm={3}>
                    <Alcool handleDataToFood={addFootprint} />
                </Grid>                       
            </Grid>
        </Paper>
    );
};

export default Food;