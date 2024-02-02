import { Paper, Typography, Box, Grid, Input, InputAdornment } from '@mui/material';
import { getTrainFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Train = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                distance: 0
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
            newState.footprint = getTrainFootprint(
                newState.params.distance
            );
            return newState;
        });
    };

    return (
        <Paper elevation={3}>
            <Typography variant='h5'>{t('transports.train.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.train.questions.distance')}</Typography>
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
                </Grid>
            </Box>
        </Paper>
    );
};

export default Train;