import { Remove, Add } from '@mui/icons-material';
import { Box, Grid, IconButton, Input, Paper, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getClothesFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Clothes = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                shoes: 0,
                tshirt: 0,
                dress: 0,
                shirt: 0,
                sweat: 0,
                short: 0,
                woolenSweat: 0,
                coat: 0,
                pant: 0,
                otherLittle: 0,
                otherBig: 0
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getClothesFootprint(state.params);
        handleDataToDivers('clothes', footprint);
    }, [
        state.params.shoes,
        state.params.tshirt,
        state.params.dress,
        state.params.shirt,
        state.params.sweat,
        state.params.short,
        state.params.woolenSweat,
        state.params.coat,
        state.params.pant,
        state.params.otherLittle,
        state.params.otherBig
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };
    
    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.clothes.title')}</Typography>
            <Box>
                <Grid container>
                    <Grid container item alignItems='center' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.clothes.question')}</Typography>
                        </Grid>
                        {Object.keys(state.params).map((item) => (
                            <Grid key={item} container item direction='row' lg={6} alignItems='center'>
                                <Grid item>
                                    <IconButton
                                        onClick={() => updateParam(item as keyof typeof state.params, state.params[item as keyof typeof state.params] - 1)}
                                        disabled={state.params[item as keyof typeof state.params] === 0}
                                    >
                                        <Remove />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`divers.clothes.options.${item}`)}</Typography>
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
            </Box>
        </Paper>
    );
};

export default Clothes;