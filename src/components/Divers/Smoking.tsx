import { Box, Grid, Input, Paper, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getSmokingFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Smoking = ({ handleDataToDivers }: { handleDataToDivers: any }) => {
    
    const [state, setState] = useState(
        {
            params: {
                cigarretes: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getSmokingFootprint(state.params.cigarretes);
        handleDataToDivers('smoking', footprint);
    }, [state.params.cigarretes]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.smoking.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.smoking.questions.cigarretes')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.cigarretes}
                                onChange={(e) => updateParam('cigarretes', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Smoking;