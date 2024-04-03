import { Box, FormControlLabel, FormGroup, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getWaterBottleFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const WaterBottle = ({ handleDataToFood }: { handleDataToFood: any }) => {

    const [state, setState] = useState(
        {
            params: {
                conso: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getWaterBottleFootprint(state.params.conso);
        handleDataToFood('waterBottle', footprint);
    }, [state.params.conso]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Box>
                <Typography variant='h5'>{t('food.waterBottle.title')}</Typography>
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography variant='body1'>{t('food.waterBottle.question')}</Typography>
                    </Grid>
                    <Grid item>
                        <FormGroup>
                            <RadioGroup
                                value={state.params.conso.toString()}
                                onChange={(e) => updateParam('conso', !state.params.conso)}
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio sx={{ color: amber[300], '&.Mui-checked': { color: amber[700] } }} />}
                                    label={t('common.yes')}
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio sx={{ color: amber[300], '&.Mui-checked': { color: amber[700] } }} />}
                                    label={t('common.no')}
                                />
                            </RadioGroup>
                        </FormGroup>                    
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default WaterBottle;