import { Grid, Input, InputAdornment, Typography } from '@mui/material';
import { getCaravanFootprint } from 'actions/transports';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

const Caravan = ({ motor, people, handleDataToTransport }: { motor: string, people: number, handleDataToTransport: any }) => {

    const [state, setState] = useState(
        {
            params: {
                distance: 0
            },
            footprint: 0
        }
    );

    useEffect(() => {
        handleData();
    }, [state.footprint]);

    const handleData = () => {
        handleDataToTransport(state.footprint);
    };

    const updateFootprint = (paramName: keyof typeof state.params, paramValue: typeof state.params[keyof typeof state.params]) => {
        setState(prevState => {
            const newState = { ...prevState };
            newState.params[paramName] = paramValue as never;
            newState.footprint = getCaravanFootprint(people, newState.params.distance, motor);
        return newState;
        });
    }

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
                        onChange={(e) => updateFootprint('distance', Number(e.target.value))}
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