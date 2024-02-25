import { Box, Grid, Paper, Input, Typography, InputAdornment, FormControlLabel, Switch, Select, MenuItem } from '@mui/material';
import { getCarFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Caravan from './Caravan';

const Car = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                distance: 0,
                sameCar: false,
                type: '',
                motor: '',
                people: 0,
                recent: true,
                fuel: '',
                conso: 0
            },
            caravan: false,
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

    const updateFootprint = (paramName: keyof typeof state.params, paramValue: typeof state.params[keyof typeof state.params]) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.params[paramName] = paramValue as never;
            newState.footprint = getCarFootprint(
                newState.params.distance,
                newState.params.sameCar,
                newState.params.type,
                newState.params.motor,
                newState.params.people,
                newState.params.recent,
                newState.params.fuel,
                newState.params.conso
            );
            return newState;
        });
    };

    const addFootprint = (footprint: number) => {
        setState({ ...state, footprint: state.footprint + footprint });
    };

    return (
        <Paper elevation={3}>
            <Typography variant='h5'>{t('transports.car.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.car.questions.distance')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.distance}
                                onChange={(e) => updateFootprint('distance', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.km')}
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                        {state.params.distance > 0 && (
                            <Box>
                                <Grid container item alignItems='center' spacing={2}>
                                    <FormControlLabel
                                        label={
                                            <Typography variant='body1'>{t('transports.car.questions.sameCar')}</Typography>
                                        }
                                        control={
                                            <Switch
                                                checked={state.params.sameCar}
                                                value={state.params.sameCar}
                                                onChange={() => updateFootprint('sameCar', !state.params.sameCar)}
                                            />
                                        }
                                        labelPlacement='start'
                                    />
                                </Grid>
                                <Grid container item alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Typography variant='body1'>{t('transports.car.questions.type')}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Select
                                            value={state.params.type}
                                            onChange={(e) => updateFootprint('type', e.target.value)}
                                        >
                                            {['small', 'medium', 'berline', 'vul', 'suv'].map((type, index) => (
                                                <MenuItem key={index} value={type}>{t(`transports.car.types.${type}`)}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                                <Grid container item alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Typography variant='body1'>{t('transports.car.questions.motor')}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Select
                                            value={state.params.motor}
                                            onChange={(e) => updateFootprint('motor', e.target.value)}
                                        >
                                            {['thermic', 'hybrid', 'electric'].map((motor, index) => (
                                                <MenuItem key={index} value={motor}>{t(`transports.car.motors.${motor}`)}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                                <Grid container item alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Typography variant='body1'>{t('transports.car.questions.people')}</Typography>
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.people}
                                        onChange={(e) => updateFootprint('people', e.target.value)}
                                    />
                                    </Grid>
                                </Grid>
                                <Grid container item alignItems='center' spacing={2}>
                                    <FormControlLabel
                                        label={
                                            <Typography variant='body1'>{t('transports.car.questions.recent')}</Typography>
                                        }
                                        control={
                                            <Switch
                                                checked={state.params.recent}
                                                value={state.params.recent}
                                                onChange={() => updateFootprint('recent', !state.params.recent)}
                                            />
                                        }
                                        labelPlacement='start'
                                    />
                                </Grid>
                                {state.params.motor === 'thermic' && (
                                    <div>
                                        <Grid container item alignItems='center' spacing={2}>
                                            <Grid item>
                                                <Typography variant='body1'>{t('transports.car.questions.fuel')}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Select
                                                    value={state.params.fuel}
                                                    onChange={(e) => updateFootprint('fuel', e.target.value)}
                                                >
                                                    {['essence', 'bio', 'gazole'].map((fuel, index) => (
                                                        <MenuItem key={index} value={fuel}>{t(`transports.car.fuels.${fuel}`)}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                        </Grid>
                                        <Grid container item alignItems='center' spacing={2}>
                                            <Grid item>
                                                <Typography variant='body1'>{t('transports.car.questions.conso')}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Input
                                                    type='number'
                                                    value={state.params.conso}
                                                    onChange={(e) => updateFootprint('conso', e.target.value)}
                                                    endAdornment={
                                                        <InputAdornment position='end'>
                                                            {t('adornments.conso100')}
                                                        </InputAdornment>
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                )}
                                <Grid container item alignItems='center' spacing={2}>
                                    <Grid item>
                                        <FormControlLabel
                                            label={
                                                <Typography variant='body1'>{t('transports.car.questions.caravan')}</Typography>
                                            }
                                            control={
                                                <Switch
                                                    checked={state.caravan}
                                                    value={state.caravan}
                                                    onChange={() => setState({ ...state, caravan: !state.caravan })}
                                                />
                                            }
                                            labelPlacement='start'
                                        />
                                    </Grid>
                                </Grid>
                                {state.caravan && <Caravan motor={state.params.motor} people={state.params.people} handleDataToTransport={addFootprint}/>}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Car;