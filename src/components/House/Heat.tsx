import { Box, Grid, Paper, Checkbox, Typography, FormGroup, FormControlLabel } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Electricity from './Electricity';
import Wood from './Wood';
import Gaz from './Gaz';
import GazBottle from './GazBottle';
import Propane from './Propane';
import HeatNetwork from './HeatNetwork';
import Fuel from './Fuel';

const Heat = ({ people, handleDataToHouse }: { people: number, handleDataToHouse: any }) => {

    const [state, setState] = useState(
        {
            sub: {
                electricity: 0,
                wood: 0,
                gaz: 0,
                gazBottle: 0,
                propane: 0,
                heatNetwork: 0,
                fuel: 0
            },
            options: {
                electricity: false,
                heatPump: false,
                wood: false,
                gaz: false,
                gazBottle: false,
                propane: false,
                heatNetwork: false,
                fuel: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = Object.values(state.sub).reduce((a, b) => a + b, 0);
        handleDataToHouse('heat', footprint);
    }, [state.sub.electricity, state.sub.wood, state.sub.gaz, state.sub.gazBottle, state.sub.propane, state.sub.heatNetwork, state.sub.fuel]);

    const addFootprint = (paramName: keyof typeof state.sub, footprint: number) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.sub[paramName] = Number(footprint);
            return newState;
        });
    };

    const updateOption = (paramName: keyof typeof state.options) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.options[paramName] = !newState.options[paramName] as never;
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.heat.title')}</Typography>
            <Box>
                <Grid container spacing={6} justifyContent='flex-start'>
                    {Object.keys(state.options).map((option) => (
                        <Grid item key={option}>
                            <Paper elevation={1} sx={{ padding: '20px', height: '40%', width: '170px', backgroundColor: green['A100'], borderRadius: '8px' }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={state.options[option as keyof typeof state.options]}
                                                value={state.options[option as keyof typeof state.options]}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }}
                                                onChange={() => updateOption(option as keyof typeof state.options)}
                                            />
                                        }
                                        label={t(`house.heat.options.${option}`)}
                                    />
                                </FormGroup>
                            </Paper>
                        </Grid>
                    ))}
                    {Object.entries(state.options).map(([option, checked]) => (
                        checked && (
                            <Grid item key={option}>
                                {(option === 'electricity' || option === 'heatPump') && <Electricity people={people} handleDataToHeat={addFootprint} />}
                                {option === 'wood' && <Wood people={people} handleDataToHeat={addFootprint} />}
                                {option === 'gaz' && <Gaz people={people} handleDataToHeat={addFootprint} />}
                                {option === 'gazBottle' && <GazBottle people={people} handleDataToHeat={addFootprint} />}
                                {option === 'propane' && <Propane people={people} handleDataToHeat={addFootprint} />}
                                {option === 'heatNetwork' && <HeatNetwork people={people} handleDataToHeat={addFootprint} />}
                                {option === 'fuel' && <Fuel people={people} handleDataToHeat={addFootprint} />}
                            </Grid>
                        )
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Heat;