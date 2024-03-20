import { Box, FormControlLabel, FormGroup, Grid, Input, InputAdornment, Paper, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { green, lightGreen } from '@mui/material/colors';
import { getBuildFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Heat from './Heat';

const House = ({ handleDataToChart }: { handleDataToChart: any }) => {

    const [state, setState] = useState(
        {
            params: {
                people: 0,
                surface: 0,
                apartment: false,
                age: 0
            },
            sub: {
                airConditioning: 0,
                build: 0,
                heat: 0,
                holidays: 0,
                outside: 0,
                pool: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = Object.values(state.sub).reduce((a, b) => a + b, 0);
        handleDataToChart('house', footprint);
    }, [
        state.sub.airConditioning,
        state.sub.build,
        state.sub.heat,
        state.sub.holidays,
        state.sub.outside,
        state.sub.pool        
    ]
    );

    useEffect(() => {
        const footprint = getBuildFootprint(state.params.people, state.params.age, state.params.surface, state.params.apartment);
        setState({ ...state, sub: { ...state.sub, build: footprint } });
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
                <Grid item lg={5} xs={12} sm={3}>
                    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
                        <Typography variant='h5'>{t('house.build')}</Typography>
                        <Box>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid container item alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Typography variant='body1'>{t('house.questions.people')}</Typography>
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
                                    <Grid item>
                                        <Typography variant='body1'>{t('house.questions.surface')}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            type='number'
                                            value={state.params.surface}
                                            onChange={(e) => updateParam('surface', e.target.value)}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    {t('adornments.squareMetter')}
                                                </InputAdornment>
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item alignItems='center' spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{t('house.questions.apartment')}</Typography>
                                </Grid>
                                    <Grid item>
                                        <FormGroup>
                                            <RadioGroup
                                                value={state.params.apartment.toString()}
                                                onChange={(e) => updateParam('apartment', !state.params.apartment)}
                                            >
                                                <FormControlLabel
                                                    value="true"
                                                    control={<Radio sx={{ color: green[300], '&.Mui-checked': { color: green[700] } }} />}
                                                    label={t('common.yes')}
                                                />
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio sx={{ color: green[300], '&.Mui-checked': { color: green[700] } }} />}
                                                    label={t('common.no')}
                                                />
                                            </RadioGroup>
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                                <Grid container item alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Typography variant='body1'>{t('house.questions.age')}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            type='number'
                                            value={state.params.age}
                                            onChange={(e) => updateParam('age', e.target.value)}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    {t('adornments.age')}
                                                </InputAdornment>
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={7} xs={12} sm={3}>
                    <Heat people={state.params.people} handleDataToHouse={addFootprint} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    
                </Grid>
                <Grid item xs={12} sm={3}>
                    
                </Grid>
                <Grid item xs={12} sm={3}>
                    
                </Grid>
                <Grid item xs={12} sm={3}>
                    
                </Grid>
            </Grid>
        </Paper>
    );
};

export default House;