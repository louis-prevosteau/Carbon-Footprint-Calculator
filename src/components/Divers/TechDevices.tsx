import { Remove, Add } from '@mui/icons-material';
import { Paper, Typography, Box, Grid, FormGroup, RadioGroup, FormControlLabel, Radio, IconButton, Input } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getTechDevicesFootprint } from 'actions/divers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PRESERV_FACTOR } from 'utils/constants';

const TechDevices = ({ handleDataToDivers }: { handleDataToDivers: any }) => {

    const [state, setState] = useState(
        {
            params: {
                preservation: '',
                techDevices: {
                    camera: 0,
                    houseVideoGame: 0,
                    personalVideoGame: 0,
                    bluetoothSpeaker: 0,
                    vocalSpeaker: 0,
                    homeCinema: 0,
                    connectedWatch: 0,
                    computer: 0,
                    personalComputer: 0,
                    pad: 0,
                    phone: 0,
                    tv: 0,
                    videoProjector: 0
                }
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getTechDevicesFootprint(state.params.techDevices, state.params.preservation);
        handleDataToDivers('techDevices', footprint);
    }, [
        state.params.preservation,
        state.params.techDevices.bluetoothSpeaker,
        state.params.techDevices.camera,
        state.params.techDevices.computer,
        state.params.techDevices.connectedWatch,
        state.params.techDevices.homeCinema,
        state.params.techDevices.houseVideoGame,
        state.params.techDevices.pad,
        state.params.techDevices.personalComputer,
        state.params.techDevices.personalVideoGame,
        state.params.techDevices.phone,
        state.params.techDevices.tv,
        state.params.techDevices.videoProjector,
        state.params.techDevices.vocalSpeaker
    ]);

    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    const updateTechDevice = (paramName: keyof typeof state.params.techDevices, paramValue: any) => {
        setState(
            {
                ...state,
                params: {
                    ...state.params,
                    techDevices: {
                        ...state.params.techDevices,
                        [paramName]: paramValue as never
                    }
                }
            }
        );
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: purple[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('divers.techDevices.title')}</Typography>
            <Box>
                <Grid container spacing={6}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('divers.techDevices.questions.preservation')}</Typography>
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
                            <Typography variant='body1'>{t('divers.techDevices.questions.techDevices')}</Typography>
                        </Grid>
                        <Grid container item>
                            {Object.keys(state.params.techDevices).map((item) => (
                                <Grid key={item} container item direction='row' lg={6} alignItems='center'>
                                    <Grid item>
                                        <IconButton
                                            onClick={() => updateTechDevice(item as keyof typeof state.params.techDevices, state.params.techDevices[item as keyof typeof state.params.techDevices] - 1)}
                                            disabled={state.params.techDevices[item as keyof typeof state.params.techDevices] === 0}
                                        >
                                            <Remove />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='h6' sx={{ textAlign: 'center' }}>{t(`divers.techDevices.options.${item}`)}</Typography>
                                        <Input
                                            type='number'
                                            value={state.params.techDevices[item as keyof typeof state.params.techDevices]}
                                            onChange={(e) => updateTechDevice(item as keyof typeof state.params.techDevices, e.target.value)}
                                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                                            sx={{ width: '80px' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => updateTechDevice(item as keyof typeof state.params.techDevices, state.params.techDevices[item as keyof typeof state.params.techDevices] + 1)}>
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

export default TechDevices;