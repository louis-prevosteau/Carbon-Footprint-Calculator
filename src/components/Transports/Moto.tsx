import { Paper, Typography, Box, Grid, Input, InputAdornment, MenuItem, Select } from '@mui/material';
import { getMotoFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Moto = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                distance: 0,
                type: ''
            },
            footprint: 0
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        handleData();
    }, [state.footprint]);

    const handleData = () => {
        handleDataToTransport(state.footprint);
    };

    const updateFootprint = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.params[paramName] = paramValue as never;
            newState.footprint = getMotoFootprint(
                newState.params.type,
                newState.params.distance
            );
            return newState;
        });
    };

    return (
        <Paper elevation={3}>
            <Typography variant='h5'>{t('transports.moto.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.moto.questions.distance')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.distance}
                                onChange={(e) => updateFootprint('distance', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.km')}
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.moto.questions.type')}</Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={state.params.type}
                                onChange={(e) => updateFootprint('type', e.target.value)}
                            >
                                {['thermic', 'electric', 'inf250', 'sup250'].map((type, index) => (
                                    <MenuItem key={index} value={type}>{t(`transports.moto.types.${type}`)}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Moto;