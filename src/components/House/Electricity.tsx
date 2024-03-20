import { Box, Grid, Input, InputAdornment, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { getElectricityFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Electricity = ({ people, handleDataToHeat }: { people: number, handleDataToHeat: any }) => {

    const [state, setState] = useState(
        {
            params: {
                conso: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getElectricityFootprint(state.params.conso, people);
        handleDataToHeat('electricity', footprint);
    }, [state.params.conso, people]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={15} sx={{ padding: '20px', backgroundColor: green['A100'], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.electricity.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('house.electricity.questions.conso')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.conso}
                                onChange={(e) => updateParam('conso', e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        {t('adornments.kWh')}
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

export default Electricity;