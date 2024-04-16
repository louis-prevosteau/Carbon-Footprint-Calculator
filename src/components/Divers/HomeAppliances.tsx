import { Remove, Add } from '@mui/icons-material';
import { Paper, Typography, Box, Grid, FormGroup, RadioGroup, FormControlLabel, Radio, IconButton, Input } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getHomeAppliancesFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PRESERV_FACTOR } from 'utils/constants';

const HomeAppliances = ({ people, handleDataToDivers }: { people: number, handleDataToDivers: any }) => {
    
    const [state, setState] = useState(
        {
            params: {
                preservation: '',
                homeAppliances: {
                    vacuumCleaner: 0,
                    kettle: 0,
                    coffeeMaker: 0,
                    freezer: 0,
                    oven: 0,
                    hood: 0,
                    fridge: 0,
                    combinedFridge: 0,
                    washingMachine: 0,
                    dishwasher: 0,
                    dryer: 0,
                    cookingRobot: 0,
                    microwave: 0,
                    hotplates: 0
                }
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getHomeAppliancesFootprint(state.params.homeAppliances, people, state.params.preservation);
        handleDataToDivers('homeAppliances', footprint);
    }, [
        state.params.preservation,
        state.params.homeAppliances.coffeeMaker,
        state.params.homeAppliances.combinedFridge,
        state.params.homeAppliances.cookingRobot,
        state.params.homeAppliances.dishwasher,
        state.params.homeAppliances.dryer,
        state.params.homeAppliances.freezer,
        state.params.homeAppliances.fridge,
        state.params.homeAppliances.hood,
        state.params.homeAppliances.hotplates,
        state.params.homeAppliances.kettle,
        state.params.homeAppliances.microwave,
        state.params.homeAppliances.oven,
        state.params.homeAppliances.vacuumCleaner,
        state.params.homeAppliances.washingMachine
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    const updateHomeAppliance = (paramName: keyof typeof state.params.homeAppliances, paramValue: any) => {
        setState(
            {
                ...state,
                params: {
                    ...state.params,
                    homeAppliances: {
                        ...state.params.homeAppliances,
                        [paramName]: paramValue as never
                    }
                }
            }
        );
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.homeAppliances.title')}</Typography>
            <Box>
                <Grid container spacing={6}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.homeAppliances.questions.preservation')}</Typography>
                        </Grid>
                        <Grid container item>
                            <FormGroup>
                                <RadioGroup
                                    value={state.params.preservation}
                                    onChange={(e) => updateParam('preservation', e.target.value)}
                                    row
                                >
                                    {Object.keys(PRESERV_FACTOR).map((level) => (
                                        <FormControlLabel
                                            key={level}
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: purple[300],
                                                        '&.Mui-checked': {
                                                        color: purple[700],
                                                        },
                                                    }}
                                                />
                                            }
                                            value={level}
                                            label={t(`common.preservation.${level}`)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.homeAppliances.questions.homeAppliances')}</Typography>
                        </Grid>
                        <Grid container item>
                            {Object.keys(state.params.homeAppliances).map((item) => (
                                <Grid key={item} container item direction='row' lg={6} alignItems='center'>
                                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`divers.homeAppliances.options.${item}`)}</Typography>
                                    <Grid item>
                                        <IconButton
                                            onClick={() => updateHomeAppliance(item as keyof typeof state.params.homeAppliances, state.params.homeAppliances[item as keyof typeof state.params.homeAppliances] - 1)}
                                            disabled={state.params.homeAppliances[item as keyof typeof state.params.homeAppliances] === 0}
                                        >
                                            <Remove />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            type='number'
                                            value={state.params.homeAppliances[item as keyof typeof state.params.homeAppliances]}
                                            onChange={(e) => updateHomeAppliance(item as keyof typeof state.params.homeAppliances, e.target.value)}
                                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                                            sx={{ width: '80px' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => updateHomeAppliance(item as keyof typeof state.params.homeAppliances, state.params.homeAppliances[item as keyof typeof state.params.homeAppliances] + 1)}>
                                            <Add />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>                
                </Grid>
            </Box>
        </Paper>
    );
};

export default HomeAppliances;