import { Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { getSPFootprint } from 'actions/public-services';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PublicServices = ({ handleDataToChart }: { handleDataToChart: any }) => {

    const [state, setState] = useState(
        {
            params: {
                sp: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        handleDataToChart('publicServices', getSPFootprint(state.params.sp));
    }, [state.params.sp]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ border: '20px solid', borderColor: grey[500], padding: '20px', marginBottom: '20px' }}>
            <Typography variant='h4' sx={{ textAlign: 'center', pb: 5, color: grey[400], fontWeight: 'bold' }}>{t('publicServices.title')}</Typography>
            <Grid container direction='row' justifyContent='space-between'>
                <Grid item>
                    <Typography variant='body1'>{t('publicServices.question')}</Typography>
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={<Checkbox
                                    checked={state.params.sp}
                                    onChange={() => updateParam('sp', !state.params.sp)}
                                    sx={{
                                        color: grey[800],
                                        '&.Mui-checked': {
                                            color: grey[600],
                                        },
                                    }}
                                />}
                        label={t('ok')}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PublicServices;