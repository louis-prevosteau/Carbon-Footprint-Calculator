import { Remove, Add } from '@mui/icons-material';
import { Paper, Typography, Box, Grid, IconButton, Input } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getPetsFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Pets = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                littleDog: 0,
                mediumDog: 0,
                bigDog: 0,
                cat: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getPetsFootprint(state.params);
        handleDataToDivers('pets', footprint);
    }, [
        state.params.littleDog,
        state.params.mediumDog,
        state.params.bigDog,
        state.params.cat
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.pets.title')}</Typography>
            <Box>
                <Grid container spacing={6}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.pets.question')}</Typography>
                        </Grid>
                        <Grid container item>
                            {Object.keys(state.params).map((item) => (
                                <Grid key={item} container item direction='row' lg={6} alignItems='center'>
                                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`divers.pets.options.${item}`)}</Typography>
                                    <Grid item>
                                        <IconButton
                                            onClick={() => updateParam(item as keyof typeof state.params, state.params[item as keyof typeof state.params] - 1)}
                                            disabled={state.params[item as keyof typeof state.params] === 0}
                                        >
                                            <Remove />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            type='number'
                                            value={state.params[item as keyof typeof state.params]}
                                            onChange={(e) => updateParam(item as keyof typeof state.params, e.target.value)}
                                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                                            sx={{ width: '80px' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => updateParam(item as keyof typeof state.params, state.params[item as keyof typeof state.params] + 1)}>
                                            <Add />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>                
                </Grid>
            </Box>
        </Paper>
    );
};

export default Pets;