import { Grid, Paper, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Trash from './Trash';

const Food = ({ handleDataToChart }: { handleDataToChart: any }) => {

    const [state, setState] = useState(
        {
            lunch: 0,
            drink: 0,
            trash: 0
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = state.drink + state.lunch + state.trash;
        handleDataToChart('food', footprint);
    }, [state.drink, state.lunch, state.trash]);
    
    const addFootprint = (paramName: keyof typeof state, footprint: number) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState[paramName] = Number(footprint);
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ border: '20px solid', borderColor: amber[600], padding: '20px' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', pb: 5, color: amber[800], fontWeight: 'bold' }}>{t('food.title')}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>
                    <Trash handleDataToFood={addFootprint} />
                </Grid>            
            </Grid>
        </Paper>
    );
};

export default Food;