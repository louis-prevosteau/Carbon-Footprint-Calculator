import { Remove, Add } from '@mui/icons-material';
import { Box, FormControlLabel, FormGroup, Grid, IconButton, Input, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getHotDrinksFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MILKS } from 'utils/constants';

const HotDrinks = ({ handleDataToFood }: { handleDataToFood: any }) => {

    const [state, setState] = useState(
        {
            params: {
                coffee: 0,
                tea: 0,
                chocolate: 0,
                chicory: 0,
                milk: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const { coffee, tea, chocolate, chicory } = state.params;
        const footprint = getHotDrinksFootprint({ coffee, tea, chocolate, chicory }, state.params.milk);
        handleDataToFood('hotDrinks', footprint);
    }, [state.params.coffee, state.params.tea, state.params.chocolate, state.params.chicory, state.params.milk]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    const drinks = Object.keys(state.params).reduce((acc, drink) => {
        if (typeof state.params[drink as keyof typeof state.params] === 'number') {
            acc.push(
                <Grid key={drink} container item direction='row' xs={2} sm={4} md={2} alignItems='center'>
                    <Grid item>
                        <IconButton
                            onClick={() => updateParam(drink as keyof typeof state.params, state.params[drink as keyof typeof state.params] as number- 1)}
                            disabled={state.params[drink as keyof typeof state.params] === 0}
                        >
                            <Remove />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`food.hotDrinks.drinks.${drink}`)}</Typography>
                        <Input
                            type='number'
                            value={state.params[drink as keyof typeof state.params]}
                            onChange={(e) => updateParam(drink as keyof typeof state.params, Number(e.target.value))}
                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                            sx={{ width: '80px' }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => updateParam(drink as keyof typeof state.params, state.params[drink as keyof typeof state.params] as number + 1)}>
                            <Add />
                        </IconButton>
                    </Grid>
                </Grid>
            );
        }
        return acc;
    }, [] as JSX.Element[])

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.hotDrinks.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item direction='column' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.hotDrinks.questions.drink')}</Typography>
                        </Grid>
                        {drinks}
                    </Grid>
                </Grid>
                {state.params.chocolate > 0 && (
                    <Grid container item alignItems='center' spacing={2}>
                        <FormGroup>
                            <RadioGroup
                                value={state.params.milk}
                                onChange={(e) => updateParam('milk', e.target.value)}
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
            </Box>
        </Paper>
    );
};

export default HotDrinks;