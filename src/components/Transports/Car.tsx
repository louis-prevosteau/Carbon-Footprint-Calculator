import { Box, Grid, Paper, Input, Typography, InputAdornment, FormControlLabel, Switch, Select, MenuItem } from '@mui/material';
import { getCarFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Caravan from './Caravan';
import { lightBlue } from '@mui/material/colors';

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
            caravan: false
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const handleData = () => {
            const footprint = getCarFootprint(
                state.params.distance, 
                state.params.sameCar,
                state.params.type,
                state.params.motor,
                state.params.people,
                state.params.recent,
                state.params.fuel,
                state.params.conso    
            );
            handleDataToTransport('car', footprint);
        };
        handleData();
    }, [state.params.distance, state.params.sameCar, state.params.type, state.params.motor, state.params.people, state.params.recent, state.params.fuel, state.params.conso,]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { ...prevState, params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    const addFootprint = (footprint: number) => {
        handleDataToTransport('car', footprint);
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: lightBlue[500], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('transports.car.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item xs={12} sm={6} md={4}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.car.questions.distance')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.distance}
                                onChange={(e) => updateParam('distance', e.target.value)}
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
                                                onChange={() => updateParam('sameCar', !state.params.sameCar)}
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
                                            onChange={(e) => updateParam('type', e.target.value)}
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
                                            onChange={(e) => updateParam('motor', e.target.value)}
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
                                        onChange={(e) => updateParam('people', e.target.value)}
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
                                                onChange={() => updateParam('recent', !state.params.recent)}
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
                                                    onChange={(e) => updateParam('fuel', e.target.value)}
                                                >
                                                    {['essence', 'bio', 'gazole', 'gpl'].map((fuel, index) => (
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
                                                    onChange={(e) => updateParam('conso', e.target.value)}
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
                                {state.caravan && <Caravan motor={state.params.motor} people={state.params.people} handleDataToCar={addFootprint}/>}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Car;