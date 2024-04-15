import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getSportFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Sports = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                externalSport: false,
                swimming: false,
                athletics: false,
                equestring: false,
                surfing: false,
                motors: false,
                ball: false,
                martial: false,
                bodybuilding: false,
                golf: false,
                winter: false,
                other: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getSportFootprint(state.params);
        handleDataToDivers('sport', footprint);
    }, [
        state.params.externalSport,
        state.params.swimming,
        state.params.athletics,
        state.params.equestring,
        state.params.surfing,
        state.params.motors,
        state.params.ball,
        state.params.martial,
        state.params.bodybuilding,
        state.params.golf,
        state.params.winter,
        state.params.other
    ]);

    const updateOption = (paramName: keyof typeof state.params) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.params[paramName] = !newState.params[paramName] as never;
            return newState;
        });
    };
    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.sports.title')}</Typography>
            <Box>
                <Grid container spacing={6} justifyContent='flex-start'>
                    <Grid container item>
                        <Typography variant='body1'>{t('divers.sports.question')}</Typography>
                    </Grid>
                    {Object.keys(state.params).map((option) => (
                        <Grid item key={option}>
                            <Paper elevation={1} sx={{ padding: '20px', height: 'fit-content', width: '170px', backgroundColor: purple[100], borderRadius: '8px' }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={state.params[option as keyof typeof state.params]}
                                                value={state.params[option as keyof typeof state.params]}
                                                sx={{
                                                    color: purple[800],
                                                    '&.Mui-checked': {
                                                        color: purple[600],
                                                    },
                                                }}
                                                onChange={() => updateOption(option as keyof typeof state.params)}
                                            />
                                        }
                                        label={t(`divers.sports.options.${option}`)}
                                    />
                                </FormGroup>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Sports;