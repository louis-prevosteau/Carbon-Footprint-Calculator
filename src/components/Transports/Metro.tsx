import { Paper, Typography, Box, Grid, Input, InputAdornment } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { getMetroFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Metro = ({ handleDataToTransport }: { handleDataToTransport: any }) => {
    
    const [state, setState] = useState(
        {
            params: {
                hours: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getMetroFootprint(
            state.params.hours
        );
        handleDataToTransport('metro', footprint);
    }, [state.params.hours]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: lightBlue[500], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('transports.metro.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.metro.questions.hours')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.hours}
                                onChange={(e) => updateParam('hours', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.hoursPerWeek')}
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

export default Metro;