import { Box, FormControlLabel, FormGroup, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { WeekLunches, getLocalBonus } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Local = ({ handleDataToFood, lunches, breakfastFP }: { handleDataToFood: any, lunches: Object, breakfastFP: number }) => {

    const [state, setState] = useState(
        {
            params: {
                level: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const bonus = getLocalBonus(state.params.level, lunches as WeekLunches, breakfastFP);
        handleDataToFood('local', bonus);
    }, [breakfastFP, state.params.level, lunches]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.local.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.local.question')}</Typography>
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
                                        label={t('food.local.levels.never')}
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
                                        label={t('food.local.levels.sometimes')}
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
                                        label={t('food.local.levels.often')}
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
                                        label={t('food.local.levels.always')}
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

export default Local;