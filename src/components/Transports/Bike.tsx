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
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const handleData = () => {
            const footprint = getBikeFootprint(
                state.params.bike,
                state.params.electricBike,
                state.params.other,
                state.params.eBikeDistance,
                state.params.otherDistance
            );
            handleDataToTransport('bike',footprint);
        };
        handleData();
    }, [state.params.bike, state.params.eBikeDistance, state.params.electricBike, state.params.other, state.params.otherDistance]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3}>
            <Typography variant='h5'>{t('transports.bike.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item xs={12} sm={6} md={4}>
                        <FormGroup>
                            <Grid item>
                                <FormControlLabel control={<Checkbox checked={state.params.bike} onChange={() => updateParam('bike', !state.params.bike)} />} label={t('transports.bike.options.bike')} />
                            </Grid>
                            <Grid item>
                                <FormControlLabel control={<Checkbox checked={state.params.electricBike} onChange={() => updateParam('electricBike', !state.params.electricBike)} />} label={t('transports.bike.options.electricBike')} />
                            </Grid>
                            <Grid item>
                                <FormControlLabel control={<Checkbox checked={state.params.other} onChange={() => updateParam('other', !state.params.other)} />} label={t('transports.bike.options.other')} />
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
                                        onChange={(e) => updateParam('eBikeDistance', e.target.value)}
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
                                        onChange={(e) => updateParam('otherDistance', e.target.value)}
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