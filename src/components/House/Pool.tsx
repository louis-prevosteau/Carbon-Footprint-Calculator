import { Box, Grid, Input, InputAdornment, Typography } from '@mui/material';
import { getPoolFootprint } from 'actions/house';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

const Pool = ({ people, handleDataToHouse }: { people: number, handleDataToHouse: any }) => {

    const [state, setState] = useState(
        {
            params: {
                surface: 0
            }
        }
    );

    useEffect(() => {
        const footprint = getPoolFootprint(state.params.surface, people);
        handleDataToHouse('pool', footprint);
    }, [people, state.params.surface]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Box>
            <Grid container direction='column'  spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid  container alignItems="center" spacing={2}>
                        <Grid  item >
                            <Typography variant='body1'>{t('house.pool.questions.surface')}</Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                type='number'
                                value={state.params.surface}
                                onChange={(e) => updateParam('surface', e.target.value)}
                                endAdornment={<InputAdornment position='end'>{t('adornments.squareMetter')}</InputAdornment>}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Pool;