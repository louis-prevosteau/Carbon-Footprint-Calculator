import { Grid, Input, InputAdornment, Typography } from '@mui/material';
import { getCaravanFootprint } from 'actions/transports';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

const Caravan = ({ motor, people, handleDataToCar }: { motor: string, people: number, handleDataToCar: any }) => {

    const [state, setState] = useState(
        {
            params: {
                distance: 0
            }
        }
    );

    useEffect(() => {
        const footprint = getCaravanFootprint(people, state.params.distance, motor);
        handleDataToCar(footprint);
    }, [state.params.distance, people, motor]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { ...prevState, params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Grid container>
            <Grid container item alignItems='center' spacing={2}>
                <Grid item>
                    <Typography variant='body1'>{t('transports.caravan.questions.distance')}</Typography>
                </Grid>
                <Grid item>
                    <Input
                        type='number'
                        value={state.params.distance}
                        onChange={(e) => updateParam('distance', Number(e.target.value))}
                        endAdornment={
                            <InputAdornment position='end'>
                                {t('adornments.km')}
                            </InputAdornment>
                        }
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Caravan;