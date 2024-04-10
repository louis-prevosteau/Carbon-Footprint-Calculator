import { Paper, Typography, Box, Grid, Input, InputAdornment } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getStreamingFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Streaming = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                duration: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getStreamingFootprint(state.params.duration);
        handleDataToDivers('streaming', footprint);
    }, [state.params.duration]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.streaming.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.streaming.questions.duration')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.duration}
                                onChange={(e) => updateParam('duration', e.target.value)}
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

export default Streaming;