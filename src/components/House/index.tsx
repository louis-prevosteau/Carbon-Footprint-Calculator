import { Box, Checkbox, FormControlLabel, Grid, Input, InputAdornment, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { green, lightGreen } from '@mui/material/colors';
import { getBuildFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Heat from './Heat';
import AirConditioning from './AirConditioning';
import Holydays from './Holidays';
import SecondaryResidence from './SecondaryResidence';
import Outside from './Outside';
import Pool from './Pool';

const House = ({ setPeople, handleDataToChart }: { setPeople: any, handleDataToChart: any }) => {

    const [state, setState] = useState(
        {
            params: {
                people: 0,
                surface: 0,
                apartment: false,
                age: 0,
                secondaryResidence: false,
                pool: false
            },
            sub: {
                airConditioning: 0,
                build: 0,
                heat: 0,
                holidays: 0,
                secondaryResidence: 0,
                outside: 0,
                pool: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = Number(Object.values(state.sub).reduce((a, b) => a + b, 0));
        handleDataToChart('house', footprint);
    }, [
        state.sub.airConditioning,
        state.sub.build,
        state.sub.heat,
        state.sub.holidays,
        state.sub.secondaryResidence,
        state.sub.outside,
        state.sub.pool        
    ]
    );

    useEffect(() => {
        const footprint = getBuildFootprint(state.params.people, state.params.age, state.params.surface, state.params.apartment);
        setState({ ...state, sub: { ...state.sub, build: footprint } });
        setPeople(state.params.people);
    }, [state.params.age, state.params.people, state.params.surface, state.params.apartment]);

    const addFootprint = (paramName: keyof typeof state.sub, footprint: number) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.sub[paramName] = Number(footprint);
            return newState;
        });
    };

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.params[paramName] = paramValue as never;
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ border: '20px solid', borderColor: lightGreen[500], padding: '20px' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', pb: 5, color: lightGreen[300], fontWeight: 'bold' }}>{t('house.title')}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={5} md={6}>
                    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
                        <Typography variant='h5'>{t('house.build')}</Typography>
                        <Box>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={6} md={12}>
                                    <Typography variant='body1'>{t('house.questions.people')}</Typography>
                                    <Input
                                        type='number'
                                        value={state.params.people}
                                        onChange={(e) => updateParam('people', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} md={12}>
                                    <Typography variant='body1'>{t('house.questions.surface')}</Typography>
                                    <Input
                                        type='number'
                                        value={state.params.surface}
                                        onChange={(e) => updateParam('surface', e.target.value)}
                                        endAdornment={<InputAdornment position='end'>{t('adornments.squareMetter')}</InputAdornment>}
                                    />
                                </Grid>
                                <Grid item xs={6} md={12}>
                                    <Typography variant='body1'>{t('house.questions.apartment')}</Typography>
                                    <RadioGroup value={state.params.apartment.toString()} onChange={(e) => updateParam('apartment', e.target.value === 'true')}>
                                        <FormControlLabel
                                            value="true"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: green[800],
                                                        '&.Mui-checked': {
                                                            color: green[600],
                                                        },
                                                    }}
                                                />}
                                            label={t('common.yes')} />
                                        <FormControlLabel
                                            value="false"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: green[800],
                                                        '&.Mui-checked': {
                                                            color: green[600],
                                                        },
                                                    }}
                                                />}
                                            label={t('common.no')} />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={6} md={12}>
                                    <Typography variant='body1'>{t('house.questions.age')}</Typography>
                                    <Input
                                        type='number'
                                        value={state.params.age}
                                        onChange={(e) => updateParam('age', e.target.value)}
                                        endAdornment={<InputAdornment position='end'>{t('adornments.age')}</InputAdornment>}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                        <Heat people={state.params.people} handleDataToHouse={addFootprint} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <AirConditioning people={state.params.people} handleDataToHouse={addFootprint} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Holydays people={state.params.people} handleDataToHouse={addFootprint} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems='center'>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={state.params.secondaryResidence}
                                                onChange={() => updateParam('secondaryResidence', !state.params.secondaryResidence)}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }}
                                            />
                                        }
                                        label={t('house.holidays.options.secondaryResidence')}
                                    />
                                    {state.params.secondaryResidence && (
                                        <SecondaryResidence people={state.params.people} handleDataToHouse={addFootprint} />
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                    {!state.params.apartment && (
                        <Box>
                            <Box sx={{ mb: 2 }}>
                                <Outside people={state.params.people} handleDataToHouse={addFootprint} />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={state.params.pool}
                                                onChange={() => updateParam('pool', !state.params.pool)}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }}
                                            />
                                        }
                                        label={t('house.havePool')}
                                    />
                                    {state.params.pool && (
                                        <Pool people={state.params.people} handleDataToHouse={addFootprint} />
                                    )}
                                </Paper>
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default House;