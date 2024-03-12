import { Grid, IconButton, Input, Paper, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { amber } from '@mui/material/colors';
import { Box } from '@mui/system';
import { getLunchFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Lunch = ({ handleDataToFood, updateLunchParams }: { handleDataToFood: any, updateLunchParams: any }) => {

    const [state, setState] = useState(
        {
            params: {
                vegan: 0,
                vegetarian: 0,
                meat1: 0,
                meat2: 0,
                fish1: 0,
                fish2: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getLunchFootprint(state.params);
        handleDataToFood('lunch', footprint);
        updateLunchParams(state.params);
    }, [state.params.vegan, state.params.vegetarian, state.params.meat1, state.params.meat2, state.params.fish1, state.params.fish2]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.lunch.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.lunch.question')}</Typography>
                        </Grid>
                        {Object.keys(state.params).map((item) => (
                            <Grid key={item} container item direction='row' spacing={4} alignItems='center'>
                                <Grid item>
                                    <IconButton
                                        onClick={() => updateParam(item as keyof typeof state.params, state.params[item as keyof typeof state.params] - 1)}
                                        disabled={state.params[item as keyof typeof state.params] === 0}
                                    >
                                        <Remove />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`food.lunch.lunches.${item}`)}</Typography>
                                    <Input
                                        type='number'
                                        value={state.params[item as keyof typeof state.params]}
                                        onChange={(e) => updateParam(item as keyof typeof state.params, e.target.value)}
                                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                                        sx={{ width: '80px' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => updateParam(item as keyof typeof state.params, state.params[item as keyof typeof state.params] + 1)}>
                                        <Add />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Lunch;