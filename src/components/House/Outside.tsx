import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { getOutsideFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Outside = ({ people, handleDataToHouse }: { people: number, handleDataToHouse: any }) => {

    const [state, setState] = useState(
        {
            params: {
                gardenLoungeWood: false,
                gardenLoungeIron: false,
                mowerElec: false,
                mower: false,
                barbecueElec: false,
                barbecue: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getOutsideFootprint(people, state.params);
        handleDataToHouse('outside', footprint);
    }, [
        people,
        state.params.gardenLoungeIron,
        state.params.gardenLoungeWood,
        state.params.mower,
        state.params.mowerElec,
        state.params.barbecue,
        state.params.barbecueElec
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: green[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.outside.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('house.outside.question')}</Typography>
                        </Grid>
                        <Grid container item spacing={1}>
                            {Object.keys(state.params).map((param) => (
                                <Grid item key={param}>
                                    <Paper elevation={1} sx={{ padding: '20px', height: '45%', width: '170px', backgroundColor: green['A100'], borderRadius: '8px' }}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={state.params[param as keyof typeof state.params]}
                                                        value={state.params[param as keyof typeof state.params]}
                                                        sx={{
                                                            color: green[800],
                                                            '&.Mui-checked': {
                                                                color: green[600],
                                                            },
                                                        }}
                                                        onChange={() => updateParam(param as keyof typeof state.params, !state.params[param as keyof typeof state.params])}
                                                    />
                                                }
                                                label={t(`house.outside.options.${param}`)}
                                            />
                                        </FormGroup>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Outside;