import { Paper, Typography, Box, Grid, Input, InputAdornment } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { getVanFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Van = ({ people, handleDataToTransport }: { people: number, handleDataToTransport: any }) => {

    const [state, setState] = useState({
        params: {
            distance: 0,
            conso:0
        }
    });
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getVanFootprint(state.params.distance, state.params.conso, people);
        handleDataToTransport('van', footprint);
    }, [state.params.distance, state.params.conso, people]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { ...prevState, params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };
    
    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: lightBlue[500], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('transports.van.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.van.questions.distance')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.distance}
                                onChange={(e) => updateParam('distance', e.target.value)}
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
                            <Typography variant='body1'>{t('transports.van.questions.conso')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.conso}
                                onChange={(e) => updateParam('conso', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.conso100')}
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

export default Van;