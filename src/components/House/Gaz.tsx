import { Box, FormControlLabel, FormGroup, Grid, Input, InputAdornment, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { getGazFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Gaz = ({ people, handleDataToHeat }: { people: number, handleDataToHeat: any }) => {

    const [state, setState] = useState(
        {
            params: {
                conso: 0,
                biogaz: false,
                part: 0,
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getGazFootprint(state.params.conso, state.params.biogaz, people, state.params.part);
        handleDataToHeat('gaz', footprint);
    }, [people, state.params.biogaz, state.params.conso, state.params.part]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={15} sx={{ padding: '20px', backgroundColor: green['A100'], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.gaz.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Grid  container alignItems="center" spacing={2}>
                            <Grid  item >
                                <Typography variant='body1'>{t('house.gaz.questions.conso')}</Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    type='number'
                                    value={state.params.conso}
                                    onChange={(e) => updateParam('conso', e.target.value)}
                                    endAdornment={<InputAdornment position='end'>{t('adornments.kWh')}</InputAdornment>}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography variant='body1'>{t('house.gaz.questions.biogaz')}</Typography>
                            </Grid>
                            <Grid item>
                                <FormGroup>
                                    <RadioGroup
                                        value={state.params.biogaz.toString()}
                                        onChange={(e) => updateParam('biogaz', !state.params.biogaz)}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio sx={{ color: green[300], '&.Mui-checked': { color: green[700] } }} />}
                                            label={t('common.yes')}
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio sx={{ color: green[300], '&.Mui-checked': { color: green[700] } }} />}
                                            label={t('common.no')}
                                        />
                                    </RadioGroup>
                                </FormGroup>                    
                            </Grid>
                        </Grid>
                        {state.params.biogaz && (
                            <Grid  container alignItems="center" spacing={2}>
                                <Grid  item >
                                    <Typography variant='body1'>{t('house.gaz.questions.part')}</Typography>
                                </Grid>
                                <Grid item>
                                    <Input
                                        type='number'
                                        value={state.params.part}
                                        onChange={(e) => updateParam('part', e.target.value)}
                                        endAdornment={<InputAdornment position='end'>{t('adornments.perCent')}</InputAdornment>}
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

export default Gaz;