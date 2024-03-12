import { Box, Grid, Input, InputAdornment, Paper, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { getPlaneFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Plane = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                shortFlightTime: 0,
                mediumFlightTime: 0,
                longFlightTime: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getPlaneFootprint(
            state.params.shortFlightTime,
            state.params.mediumFlightTime,
            state.params.longFlightTime
        );
        handleDataToTransport('plane',footprint);
    }, [state.params.shortFlightTime, state.params.mediumFlightTime, state.params.longFlightTime]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };
    
    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: lightBlue[500], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('transports.plane.title')}</Typography>
            <Box>
                <Grid container>
                    {Object.keys(state.params).map((time) => (
                        <Grid key={time} container item alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography variant='body1'>{t(`transports.plane.questions.${time}`)}</Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    type='number'
                                    value={state.params[time as keyof typeof state.params]}
                                    onChange={(e) => updateParam(time as keyof typeof state.params, Number(e.target.value))}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            {t('adornments.hours')}
                                        </InputAdornment>
                                    }
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Plane;