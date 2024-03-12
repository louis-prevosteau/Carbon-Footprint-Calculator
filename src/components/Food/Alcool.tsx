import { Box, Grid, Input, InputAdornment, Paper, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getAlcoolFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Alcool = ({ handleDataToFood }: { handleDataToFood: any }) => {

    const [state, setState] = useState(
        {
            params: {
                conso: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getAlcoolFootprint(state.params.conso);
        handleDataToFood('alcool', footprint);
    }, [state.params.conso]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.alcool.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.alcool.questions.conso')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.conso}
                                onChange={(e) => updateParam('conso', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.literPerWeek')}
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Alcool;