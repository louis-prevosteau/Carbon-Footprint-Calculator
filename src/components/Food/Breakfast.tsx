import { Box, FormGroup, Grid, Paper, RadioGroup, Typography, FormControlLabel, Radio } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getBreakfastFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BREAKFASTS, MILKS } from 'utils/constants';

const Breakfast = ({ handleDataToFood }: { handleDataToFood: any }) => {

    const [state, setState] = useState(
        {
            params: {
                value: '',
                milk: ''
            }
        }
    );
    const { t } = useTranslation();
    
    useEffect(() => {
        const footprint = getBreakfastFootprint(state.params.value, state.params.milk);
        handleDataToFood('breakfast', footprint);
    }, [state.params.value, state.params.milk]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.breakfast.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography variant='body1'>{t('food.breakfast.question')}</Typography>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={4}>
                        <FormGroup>
                            <RadioGroup
                                value={state.params.value}
                                onChange={(e) => updateParam('value', e.target.value)}
                                row
                            >
                                {BREAKFASTS.map((breakFast) => (
                                    <FormControlLabel
                                        key={breakFast}
                                        value={breakFast}
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
                                        label={t(`food.breakfast.types.${breakFast}`)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormGroup>
                    </Grid>
                    {state.params.value === 'milk' && (
                        <Grid container item alignItems='center' spacing={2}>
                            <Typography variant='body1'>{t('common.milk')}</Typography>
                            <FormGroup>
                                <RadioGroup
                                    value={state.params.milk}
                                    onChange={(e) => updateParam('milk', e.target.value)}
                                    row
                                >
                                    {Object.keys(MILKS).map((milk) => (
                                        <FormControlLabel
                                            key={milk}
                                            value={milk}
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
                                            label={t(`common.milks.${milk}`)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Breakfast;