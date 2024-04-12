import { Paper, Typography, Box, Grid, FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getNewManufactsFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NEW_MANUFACT_LEVELS } from 'utils/constants';

const NewManufacts = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                level: ''
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getNewManufactsFootprint(state.params.level);
        handleDataToDivers('newManufacts', footprint);
    }, [state.params.level]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };
    
    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.newManufacts.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.newManufacts.questions.level')}</Typography>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                <RadioGroup
                                    value={state.params.level}
                                    onChange={(e) => updateParam('level', e.target.value)}
                                >
                                    {Object.keys(NEW_MANUFACT_LEVELS).map((level) => (
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
                                            label={t(`divers.newManufacts.options.${level}`)}
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

export default NewManufacts;