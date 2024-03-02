import { Box, Grid, Input, InputAdornment, Paper, Typography } from '@mui/material';
import { getPlaneFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Plane = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                shortFlightTime: 0,
                mediumFlightTime: 0,
                longFlightTime: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const handleData = () => {
            const footprint = getPlaneFootprint(
                state.params.shortFlightTime,
                state.params.mediumFlightTime,
                state.params.longFlightTime
            );
            handleDataToTransport('plane',footprint);
        };
        handleData();
    }, [state.params.shortFlightTime, state.params.mediumFlightTime, state.params.longFlightTime]);

    const updateFootprint = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };
    return (
        <Paper elevation={3}>
            <Typography variant='h5'>{t('transports.plane.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.plane.questions.shortFlightTime')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.shortFlightTime}
                                onChange={(e) => updateFootprint('shortFlightTime', Number(e.target.value))}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.hours')}
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.plane.questions.mediumFlightTime')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.mediumFlightTime}
                                onChange={(e) => updateFootprint('mediumFlightTime', Number(e.target.value))}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.hours')}
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.plane.questions.longFlightTime')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.longFlightTime}
                                onChange={(e) => updateFootprint('longFlightTime', Number(e.target.value))}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.hours')}
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

export default Plane;