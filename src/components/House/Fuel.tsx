import { Paper, Typography, Box, Grid, Input, InputAdornment } from '@mui/material';
import { green } from '@mui/material/colors';
import { getFuelFootprint } from 'actions/house';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Fuel = ({ people, handleDataToHeat }: { people: number, handleDataToHeat: any }) => {
    const [state, setState] = useState(
        {
            params: {
                conso: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getFuelFootprint(state.params.conso, people);
        handleDataToHeat('fuel', footprint);
    }, [people, state.params.conso]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={15} sx={{ padding: '20px', backgroundColor: green['A100'], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('house.fuel.title')}</Typography>
            <Box>
                <Grid container direction='column'  spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Grid  container alignItems="center" spacing={2}>
                            <Grid  item >
                                <Typography variant='body1'>{t('house.fuel.questions.conso')}</Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    type='number'
                                    value={state.params.conso}
                                    onChange={(e) => updateParam('conso', e.target.value)}
                                    endAdornment={<InputAdornment position='end'>{t('adornments.liter')}</InputAdornment>}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Fuel;