import { Box, Grid, Input, InputAdornment, MenuItem, Paper, Select, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { getWoodFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WOOD_TYPES } from 'utils/constants';

const Wood = ({ people, handleDataToHeat }: { people: number, handleDataToHeat: any }) => {

    const [state, setState] = useState(
        {
            params: {
                conso: 0,
                type: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getWoodFootprint(state.params.conso, state.params.type, people);
        handleDataToHeat('wood', footprint);
    }, [state.params.conso, state.params.type, people]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={15} sx={{ padding: '20px', backgroundColor: green['A100'], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.wood.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Grid container item alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography variant='body1'>{t('house.wood.questions.type')}</Typography>
                            </Grid>
                            <Grid item>
                                <Select
                                    value={state.params.type}
                                    onChange={(e) => updateParam('type', e.target.value)}
                                >
                                    {WOOD_TYPES.map((type, index) => (
                                        <MenuItem key={index} value={type}>{t(`house.wood.types.${type}`)}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    {state.params.type === 'pellets' && (
                        <Grid item xs={12} md={6}>
                            <Grid container item alignItems='center' spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{t('house.wood.questions.consoGranul')}</Typography>
                                </Grid>
                                <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.conso}
                                        onChange={(e) => updateParam('conso', e.target.value)}
                                        endAdornment={<InputAdornment position='end'>{t('adornments.kWh')}</InputAdornment>}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {state.params.type === 'log' && (
                        <Grid item xs={12} md={6}>
                            <Grid container item alignItems='center' spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{t('house.wood.questions.consoWood')}</Typography>
                                </Grid>
                                <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.conso}
                                        onChange={(e) => updateParam('conso', e.target.value)}
                                        endAdornment={<InputAdornment position='end'>{t('adornments.kWh')}</InputAdornment>}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Wood;