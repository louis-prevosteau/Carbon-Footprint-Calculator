import { Paper, Typography, Box, Grid, Input, InputAdornment } from '@mui/material';
import { getMetroFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Metro = ({ handleDataToTransport }: { handleDataToTransport: any }) => {
    
    const [state, setState] = useState(
        {
            params: {
                hours: 0
            },
            footprint: 0
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        handleData();
    }, [state.footprint]);

    const handleData = () => {
        handleDataToTransport(state.footprint);
    };

    const updateFootprint = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.params[paramName] = paramValue as never;
            newState.footprint = getMetroFootprint(
                newState.params.hours
            );
            return newState;
        });
    };

    return (
        <Paper elevation={3}>
            <Typography variant='h5'>{t('transports.metro.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.metro.questions.hours')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.hours}
                                onChange={(e) => updateFootprint('hours', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.hoursPerWeek')}
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Metro;