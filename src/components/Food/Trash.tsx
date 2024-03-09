import { Box, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getTrashFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Trash = ({ handleDataToFood }: { handleDataToFood: any }) => {

    const [state, setState] = useState(
        {
            params: {
                level: '',
                antiWaste: false,
                compost: false,
                stopPub: false,
                bulk: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getTrashFootprint(
            state.params.level,
            state.params.antiWaste,
            state.params.compost,
            state.params.stopPub,
            state.params.bulk
        );
        handleDataToFood('trash', footprint);
    }, [state.params.level, state.params.antiWaste, state.params.compost, state.params.stopPub, state.params.bulk]);
    
    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };
    
    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.trash.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.trash.questions.level')}</Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={state.params.level}
                                onChange={(e) => updateParam('level', e.target.value)}
                            >
                                {['base', 'reduction', 'zero'].map((level) => (
                                    <MenuItem key={level} value={level}>{t(`food.trash.levelOptions.${level}`)}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    {state.params.level === 'reduction' && (
                        <Grid container item xs={12} sm={6} md={4}>
                            <FormGroup>
                                <Grid item>
                                    <FormControlLabel control={<Checkbox checked={state.params.antiWaste} onChange={() => updateParam('antiWaste', !state.params.antiWaste)} />} label={t('food.trash.tips.antiWaste')} />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel control={<Checkbox checked={state.params.compost} onChange={() => updateParam('compost', !state.params.compost)} />} label={t('food.trash.tips.compost')} />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel control={<Checkbox checked={state.params.stopPub} onChange={() => updateParam('stopPub', !state.params.stopPub)} />} label={t('food.trash.tips.stopPub')} />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel control={<Checkbox checked={state.params.bulk} onChange={() => updateParam('bulk', !state.params.bulk)} />} label={t('food.trash.tips.bulk')} />
                                </Grid>                        
                            </FormGroup>                      
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Trash;