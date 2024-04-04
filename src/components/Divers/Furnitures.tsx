import { Remove, Add } from '@mui/icons-material';
import { Box, FormControlLabel, FormGroup, Grid, IconButton, Input, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getFurnituresFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PRESERV_FACTOR } from 'utils/constants';

const Furnitures = ({ people, handleDataToDivers }: { people: number, handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                preservation: '',
                furnitures: {
                    cupboard: 0,
                    couch: 0,
                    mattress: 0,
                    bed: 0,
                    table: 0,
                    chair: 0,
                    littleFurniture: 0,
                    bigFurniture: 0
                }
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getFurnituresFootprint(state.params.furnitures, people, state.params.preservation);
        handleDataToDivers('furnitures', footprint);
    }, [
        state.params.preservation,
        state.params.furnitures.cupboard,
        state.params.furnitures.couch,
        state.params.furnitures.mattress,
        state.params.furnitures.bed,
        state.params.furnitures.table,
        state.params.furnitures.chair,
        state.params.furnitures.littleFurniture,
        state.params.furnitures.bigFurniture
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    const updateFurniture = (paramName: keyof typeof state.params.furnitures, paramValue: any) => {
        setState(
            {
                ...state,
                params: {
                    ...state.params,
                    furnitures: {
                        ...state.params.furnitures,
                        [paramName]: paramValue as never
                    }
                }
            }
        );
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.furnitures.title')}</Typography>
            <Box>
                <Grid container spacing={6}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.furnitures.questions.preservation')}</Typography>
                        </Grid>
                        <Grid container item>
                            <FormGroup>
                                <RadioGroup
                                    value={state.params.preservation}
                                    onChange={(e) => updateParam('preservation', e.target.value)}
                                >
                                    {Object.keys(PRESERV_FACTOR).map((level) => (
                                        <FormControlLabel
                                            key={level}
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: purple[300],
                                                        '&.Mui-checked': {
                                                        color: purple[700],
                                                        },
                                                    }}
                                                />
                                            }
                                            value={level}
                                            label={t(`common.preservation.${level}`)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.furnitures.questions.furnitures')}</Typography>
                        </Grid>
                        <Grid container item>
                            {Object.keys(state.params.furnitures).map((item) => (
                                <Grid key={item} container item direction='row' lg={6} alignItems='center'>
                                    <Grid item>
                                        <IconButton
                                            onClick={() => updateFurniture(item as keyof typeof state.params.furnitures, state.params.furnitures[item as keyof typeof state.params.furnitures] - 1)}
                                            disabled={state.params.furnitures[item as keyof typeof state.params.furnitures] === 0}
                                        >
                                            <Remove />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`divers.furnitures.options.${item}`)}</Typography>
                                        <Input
                                            type='number'
                                            value={state.params.furnitures[item as keyof typeof state.params.furnitures]}
                                            onChange={(e) => updateFurniture(item as keyof typeof state.params.furnitures, e.target.value)}
                                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                                            sx={{ width: '80px' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => updateFurniture(item as keyof typeof state.params.furnitures, state.params.furnitures[item as keyof typeof state.params.furnitures] + 1)}>
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

export default Furnitures;