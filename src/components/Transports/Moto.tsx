import { Paper, Typography, Box, Grid, Input, InputAdornment, MenuItem, Select } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { getMotoFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MOTO_TYPES_FOOTPRINTS } from 'utils/constants';

const Moto = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                distance: 0,
                type: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getMotoFootprint(
            state.params.type,
            state.params.distance
        );
        handleDataToTransport('moto', footprint);
    }, [state.params.distance, state.params.type]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: lightBlue[500], borderRadius: '10px' }}>
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
                            <Typography variant='body1'>{t('transports.moto.questions.type')}</Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={state.params.type}
                                onChange={(e) => updateParam('type', e.target.value)}
                            >
                                {Object.keys(MOTO_TYPES_FOOTPRINTS).map((type, index) => (
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