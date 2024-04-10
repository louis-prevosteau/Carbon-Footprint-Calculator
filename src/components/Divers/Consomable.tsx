import { Paper, Typography, Box, Grid, FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { amber, purple } from '@mui/material/colors';
import { getConsomableFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CONSOMABLE_CONSO, LEVELS } from 'utils/constants';

const Consomable = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                conso: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getConsomableFootprint(state.params.conso);
        handleDataToDivers('consomable', footprint);
    }, [ state.params.conso]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.consomable.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.consomable.questions.coso')}</Typography>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                <RadioGroup
                                    value={state.params.conso}
                                    onChange={(e) => updateParam('conso', e.target.value)}
                                >
                                    {Object.keys(CONSOMABLE_CONSO).map((level) => (
                                        <FormControlLabel
                                            key={level}
                                            value={level}
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
                                            label={t(`divers.consomable.options.${level}`)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Consomable;