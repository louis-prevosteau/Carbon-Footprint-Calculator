import { Box, Grid, Input, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { getAirConditioningFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AirConditioning = ({ people, handleDataToHouse }: { people: number, handleDataToHouse: any }) => {

    const [state, setState] = useState(
        {
            params: {
                clim: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getAirConditioningFootprint(state.params.clim, people);
        handleDataToHouse('airConditioning', footprint);
    },[people, state.params.clim]);
    
    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.airConditioning.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('house.airConditioning.questions.clim')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.clim}
                                onChange={(e) => updateParam('clim', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default AirConditioning;