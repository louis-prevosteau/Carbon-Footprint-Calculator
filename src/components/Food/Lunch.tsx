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
                        <Grid container item direction='row' spacing={4} alignItems='center'>
                            <Grid item>
                                <IconButton
                                    onClick={() => updateParam('vegan', state.params.vegan - 1)}
                                    disabled={state.params.vegan === 0}
                                >
                                    <Remove />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ textAlign: 'center' }}>{t('food.lunch.lunches.vegan')}</Typography>
                                <Input
                                    type='number'
                                    value={state.params.vegan}
                                    onChange={(e) => updateParam('vegan', e.target.value)}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    sx={{ width: '80px' }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => updateParam('vegan', state.params.vegan + 1)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={4} alignItems='center'>
                            <Grid item>
                                <IconButton
                                    onClick={() => updateParam('vegetarian', state.params.vegetarian - 1)}
                                    disabled={state.params.vegetarian === 0}
                                >
                                    <Remove />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ textAlign: 'center' }}>{t('food.lunch.lunches.vegetarian')}</Typography>
                                <Input
                                    type='number'
                                    value={state.params.vegetarian}
                                    onChange={(e) => updateParam('vegetarian', e.target.value)}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    sx={{ width: '80px' }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => updateParam('vegetarian', state.params.vegetarian + 1)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={4} alignItems='center'>
                            <Grid item>
                                <IconButton
                                    onClick={() => updateParam('meat1', state.params.meat1 - 1)}
                                    disabled={state.params.meat1 === 0}
                                >
                                    <Remove />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ textAlign: 'center' }}>{t('food.lunch.lunches.meat1')}</Typography>
                                <Input
                                    type='number'
                                    value={state.params.meat1}
                                    onChange={(e) => updateParam('meat1', e.target.value)}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    sx={{ width: '80px' }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => updateParam('meat1', state.params.meat1 + 1)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={4} alignItems='center'>
                            <Grid item>
                                <IconButton
                                    onClick={() => updateParam('meat2', state.params.meat2 - 1)}
                                    disabled={state.params.meat2 === 0}
                                >
                                    <Remove />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ textAlign: 'center' }}>{t('food.lunch.lunches.meat2')}</Typography>
                                <Input
                                    type='number'
                                    value={state.params.meat2}
                                    onChange={(e) => updateParam('meat2', e.target.value)}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    sx={{ width: '80px' }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => updateParam('meat2', state.params.meat2 + 1)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={4} alignItems='center'>
                            <Grid item>
                                <IconButton
                                    onClick={() => updateParam('fish1', state.params.fish1 - 1)}
                                    disabled={state.params.fish1 === 0}
                                >
                                    <Remove />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ textAlign: 'center' }}>{t('food.lunch.lunches.fish1')}</Typography>
                                <Input
                                    type='number'
                                    value={state.params.fish1}
                                    onChange={(e) => updateParam('fish1', e.target.value)}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    sx={{ width: '80px' }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => updateParam('fish1', state.params.fish1 + 1)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={4} alignItems='center'>
                            <Grid item>
                                <IconButton
                                    onClick={() => updateParam('fish2', state.params.fish2 - 1)}
                                    disabled={state.params.fish2 === 0}
                                >
                                    <Remove />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' sx={{ textAlign: 'center' }}>{t('food.lunch.lunches.fish2')}</Typography>
                                <Input
                                    type='number'
                                    value={state.params.fish2}
                                    onChange={(e) => updateParam('fish2', e.target.value)}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    sx={{ width: '80px' }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => updateParam('fish2', state.params.fish2 + 1)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Lunch;