import { Paper, Typography, Box, Grid, FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getSeasonBonus } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Season = ({ handleDataToFood, lunchFP, breakfastFP }: { handleDataToFood: any, lunchFP: number, breakfastFP: number }) => {

    const [state, setState] = useState(
        {
            params: {
                level: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const bonus = getSeasonBonus(state.params.level, breakfastFP, lunchFP);
        handleDataToFood('season', bonus);
    }, [state.params.level, lunchFP, breakfastFP]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.season.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.season.question')}</Typography>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                <RadioGroup
                                    value={state.params.level}
                                    onChange={(e) => updateParam('level', e.target.value)}
                                >
                                    <FormControlLabel
                                        value='never'
                                        control={
                                            <Radio
                                                sx={{
                                                color: amber[300],
                                                '&.Mui-checked': {
                                                color: amber[700],
                                                },
                                            }}
                                            />
                                        }
                                        label={t('food.season.levels.never')}
                                    />
                                    <FormControlLabel
                                        value='sometimes'
                                        control={
                                            <Radio
                                                sx={{
                                                color: amber[300],
                                                '&.Mui-checked': {
                                                color: amber[700],
                                                },
                                            }}
                                            />
                                        }
                                        label={t('food.season.levels.sometimes')}
                                    />
                                    <FormControlLabel
                                        value='often'
                                        control={
                                            <Radio
                                                sx={{
                                                color: amber[300],
                                                '&.Mui-checked': {
                                                color: amber[700],
                                                },
                                            }}
                                            />
                                        }
                                        label={t('food.season.levels.often')}
                                    />
                                    <FormControlLabel
                                        value='always'
                                        control={
                                            <Radio
                                                sx={{
                                                color: amber[300],
                                                '&.Mui-checked': {
                                                color: amber[700],
                                                },
                                            }}
                                            />
                                        }
                                        label={t('food.season.levels.always')}
                                    />
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Season;