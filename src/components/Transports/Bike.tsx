import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Input, InputAdornment, Paper, Typography } from '@mui/material';
import { getBikeFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Bike = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                bike: false,
                electricBike: false,
                other: false,
                eBikeDistance: 0,
                otherDistance: 0,
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
            newState.footprint = getBikeFootprint(
                newState.params.bike,
                newState.params.electricBike,
                newState.params.other,
                newState.params.eBikeDistance,
                newState.params.otherDistance
            );
            return newState;
        });
    };

    return (
        <Paper elevation={3}>
            <Typography variant='h5'>{t('transports.bike.title')}</Typography>
            <Box>
                <Grid container direction='column'>
                    <Grid container item direction='row' spacing={5}>
                        <FormGroup>
                            <Grid item>
                                <FormControlLabel control={<Checkbox checked={state.params.bike} onChange={() => updateFootprint('bike', !state.params.bike)} />} label={t('transports.bike.options.bike')} />
                            </Grid>
                            <Grid item>
                                <FormControlLabel control={<Checkbox checked={state.params.electricBike} onChange={() => updateFootprint('electricBike', !state.params.electricBike)} />} label={t('transports.bike.options.electricBike')} />
                            </Grid>
                            <Grid item>
                                <FormControlLabel control={<Checkbox checked={state.params.other} onChange={() => updateFootprint('other', !state.params.other)} />} label={t('transports.bike.options.other')} />
                            </Grid>                        
                        </FormGroup>                      
                    </Grid>
                    <Grid container item direction='column' spacing={5}>
                        {state.params.electricBike && (
                            <Grid container item alignItems='center' spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{t('transports.bike.questions.eBikeDistance')}</Typography>
                                </Grid>
                                <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.eBikeDistance}
                                        onChange={(e) => updateFootprint('eBikeDistance', e.target.value)}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                {t('adornments.km')}
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {state.params.other && (
                            <Grid container item alignItems='center' spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{t('transports.bike.questions.otherDistance')}</Typography>
                                </Grid>
                                <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.otherDistance}
                                        onChange={(e) => updateFootprint('otherDistance', e.target.value)}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                {t('adornments.km')}
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Bike;