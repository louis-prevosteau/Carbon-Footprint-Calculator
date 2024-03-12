import { Box, Grid, Paper, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getHotDrinksFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.hotDrinks.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item direction='column' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.hotDrinks.questions.drink')}</Typography>
                        </Grid>
                        <Grid item>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default HotDrinks;