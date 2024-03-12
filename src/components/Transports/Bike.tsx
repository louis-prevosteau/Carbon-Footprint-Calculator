import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Input, InputAdornment, Paper, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { getBikeFootprint } from 'actions/transports';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Bike = ({ handleDataToTransport }: { handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                bike: false,
                electricBike: false,
                other: false,
                eBikeDistance: 0,
                otherDistance: 0,
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getBikeFootprint(
            state.params.bike,
            state.params.electricBike,
            state.params.other,
            state.params.eBikeDistance,
            state.params.otherDistance
        );
        handleDataToTransport('bike',footprint);
    }, [state.params.bike, state.params.eBikeDistance, state.params.electricBike, state.params.other, state.params.otherDistance]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    const options = Object.keys(state.params).reduce((acc, key) => {
        if (typeof state.params[key as keyof typeof state.params] === 'boolean') {
          acc.push(
            <Grid item key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.params[key as keyof typeof state.params] as boolean}
                    onChange={() => updateParam(key as keyof typeof state.params, !state.params[key as keyof typeof state.params])}
                  />
                }
                label={t(`transports.bike.options.${key}`)}
              />
            </Grid>
          );
        }
        return acc;
      }, [] as JSX.Element[]);

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: lightBlue[500], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('transports.bike.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item xs={12} sm={6} md={4}>
                        <FormGroup>
                            {options}                        
                        </FormGroup>                      
                    </Grid>
                    <Grid container item direction='column' spacing={5}>
                        {state.params.electricBike && (
                            <Grid container item alignItems='center' spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{t('transports.bike.questions.eBikeDistance')}</Typography>
                                </Grid>
                                <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.eBikeDistance}
                                        onChange={(e) => updateParam('eBikeDistance', e.target.value)}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                {t('adornments.km')}
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {state.params.other && (
                            <Grid container item alignItems='center' spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>{t('transports.bike.questions.otherDistance')}</Typography>
                                </Grid>
                                <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.otherDistance}
                                        onChange={(e) => updateParam('otherDistance', e.target.value)}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                {t('adornments.km')}
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Bike;