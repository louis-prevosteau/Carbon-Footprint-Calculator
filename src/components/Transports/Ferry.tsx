import { Paper, Typography, Box, Grid, Input, InputAdornment } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { getFerryFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Ferry = ({ handleDataToTransport }: { handleDataToTransport: any }) => {
    
    const [state, setState] = useState(
        {
            params: {
                hours: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const handleData = () => {
            const footprint = getFerryFootprint(
                state.params.hours
            );
            handleDataToTransport('ferry', footprint);
        };
        handleData();
    }, [state.params.hours]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ backgroundColor: lightBlue[500], padding: '20px', borderRadius: '10px' }}>
            <Typography variant='h5'>{t('transports.ferry.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item xs={12} sm={6} md={4}>
                        <Grid item>
                            <Typography variant='body1'>{t('transports.ferry.questions.hours')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.hours}
                                onChange={(e) => updateParam('hours', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.hours')}
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

export default Ferry;