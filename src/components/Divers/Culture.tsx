import { Paper, Typography, Box, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getCultureFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Culture = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                show: false,
                museum: false,
                books: false,
                music: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getCultureFootprint(state.params);
        handleDataToDivers('culture', footprint);
    }, [state.params.show,
        state.params.museum,
        state.params.books,
        state.params.music
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
            <Typography variant='h5'>{t('divers.culture.title')}</Typography>
            <Box>
                <Grid container spacing={6} justifyContent='flex-start'>
                    <Grid container item>
                        <Typography variant='body1'>{t('divers.culture.question')}</Typography>
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
                                        label={t(`divers.culture.options.${option}`)}
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

export default Culture;