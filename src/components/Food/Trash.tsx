import { Box, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import { getTrashFootprint } from 'actions/food';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TRASH_LEVELS } from 'utils/constants';

const Trash = ({ handleDataToFood }: { handleDataToFood: any }) => {

    const [state, setState] = useState(
        {
            params: {
                level: '',
                antiWaste: false,
                compost: false,
                stopPub: false,
                bulk: false
            }
        }
    );
    const { t } = useTranslation();

    useEffect(() => {
        const footprint = getTrashFootprint(
            state.params.level,
            state.params.antiWaste,
            state.params.compost,
            state.params.stopPub,
            state.params.bulk
        );
        handleDataToFood('trash', footprint);
    }, [state.params.level, state.params.antiWaste, state.params.compost, state.params.stopPub, state.params.bulk]);
    
    const updateParam = (paramName: keyof typeof state.params, paramValue: any) => {
        setState(prevState => {
            const newState = { params: { ...prevState.params, [paramName]: paramValue as never } };
            return newState;
        });
    };

    const trashTips = Object.keys(state.params).reduce((acc, key) => {
        if (typeof state.params[key as keyof typeof state.params] === 'boolean') {
          acc.push(
            <Grid item key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.params[key as keyof typeof state.params] as boolean}
                    onChange={() => updateParam(key as keyof typeof state.params, !state.params[key as keyof typeof state.params])}
                    sx={{
                        color: amber[300],
                        '&.Mui-checked': {
                            color: amber[700],
                        },
                    }}
                  />
                }
                label={t(`food.trash.tips.${key}`)}
              />
            </Grid>
          );
        }
        return acc;
      }, [] as JSX.Element[]);
    
    return (
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: amber[200], borderRadius: '10px' }}>
            <Typography variant='h5'>{t('food.trash.title')}</Typography>
            <Box>
                <Grid container direction='column' spacing={2}>
                    <Grid container item alignItems='center' spacing={2}>
                        <Grid item>
                            <Typography variant='body1'>{t('food.trash.questions.level')}</Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={state.params.level}
                                onChange={(e) => updateParam('level', e.target.value)}
                            >
                                {TRASH_LEVELS.map((level) => (
                                    <MenuItem key={level} value={level}>{t(`food.trash.levelOptions.${level}`)}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    {state.params.level === 'reduction' && (
                        <Grid container item xs={12} sm={6} md={4}>
                            <FormGroup>
                                {trashTips}                       
                            </FormGroup>                      
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Trash;