import { Remove, Add } from '@mui/icons-material';
import { Box, Grid, IconButton, Input, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { getHolidaysFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Holidays = ({ people, handleDataToHouse }: { people: number, handleDataToHouse: any }) => {

    const [state, setState] = useState(
        {
            params: {
                hotel: 0,
                camping: 0,
                youthHotel: 0,
                homeRental: 0,
                familly: 0,
                homeExchange: 0,
            },
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getHolidaysFootprint(state.params, people);
        handleDataToHouse('holidays', footprint);
    }, [
        people,
        state.params.camping,
        state.params.familly,
        state.params.homeExchange,
        state.params.homeRental,
        state.params.hotel,
        state.params.youthHotel
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { ...prevState, params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.holidays.title')}</Typography>
            <Box>
                <Grid container spacing={3} justifyContent='center' direction='row'>
                    {Object.keys(state.params).map((param) => (
                        <Grid key={param} container item direction='row' lg={6} alignItems='center'>
                            <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`house.holidays.options.${param}`)}</Typography>
                            <Grid item>
                                <IconButton
                                    onClick={() => updateParam(param as keyof typeof state.params, state.params[param as keyof typeof state.params] - 1)}
                                    disabled={state.params[param as keyof typeof state.params] === 0}
                                >
                                    <Remove />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Input
                                    type='number'
                                    value={state.params[param as keyof typeof state.params]}
                                    onChange={(e) => updateParam(param as keyof typeof state.params, e.target.value)}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    sx={{ width: '80px' }}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => updateParam(param as keyof typeof state.params, state.params[param as keyof typeof state.params] + 1)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Holidays;