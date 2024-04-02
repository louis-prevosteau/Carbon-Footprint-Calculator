import { Box, Grid, Input, InputAdornment, MenuItem, Paper, Select, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { getSecondaryResidenceFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCATIONS, SEASONS } from 'utils/constants';

const SecondaryResidence = ({ people, handleDataToHouse }: { people: number, handleDataToHouse: any }) => {

    const [state, setState] = useState(
        {
            params: {
                surface: 0,
                duration: 0,
                location: '',
                season: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getSecondaryResidenceFootprint(people, state.params.surface, state.params.duration, state.params.location, state.params.season);
        handleDataToHouse('secondaryResidence', footprint);
    }, [
        state.params.duration,
        state.params.location,
        state.params.season,
        state.params.surface,
        people
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };
    
    return (
        <Box>
            <Typography variant='h5'>{t('house.holidays.secondaryResidence.title')}</Typography>
            <Grid container direction='column' spacing={2}>
                <Grid container spacing={5} item xs={12} md={6}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography>{t('house.holidays.secondaryResidence.questions.surface')}</Typography>
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
                            <Typography>{t('house.holidays.secondaryResidence.questions.duration')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.duration}
                                onChange={(e) => updateParam('duration', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography>{t('house.holidays.secondaryResidence.questions.location')}</Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={state.params.location}
                                onChange={(e) => updateParam('location', e.target.value)}
                            >
                                {LOCATIONS.map((location) => (
                                    <MenuItem key={location} value={location} >{t(`house.holidays.secondaryResidence.locations.${location}`)}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography>{t('house.holidays.secondaryResidence.questions.season')}</Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={state.params.season}
                                onChange={(e) => updateParam('season', e.target.value)}
                            >
                                {SEASONS.map((season) => (
                                    <MenuItem key={season} value={season} >{t(`house.holidays.secondaryResidence.seasons.${season}`)}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SecondaryResidence;