import { Box, Typography } from '@mui/material';
import { amber, cyan, grey, lightGreen, purple } from '@mui/material/colors';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';


ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);

const Chart = ({ data }: { data: number[] }) => {

    const { t } = useTranslation();

    return (
        <Box sx={{ width: '25%', margin: 'auto' }}>
            <Doughnut
                data={{
                    labels: [
                        t('chart.labels.transports'),    
                        t('chart.labels.food'),
                        t('chart.labels.house'),
                        t('chart.labels.divers'),
                        t('chart.labels.publicServices'),    
                    ],
                    datasets: [
                        {
                            label: t('chart.footprintAdornment'),
                            data,
                            backgroundColor: [cyan[800], amber[600], lightGreen[500], purple[300], grey[500]]
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                            display: false
                        }
                    }
                }}
            />
        </Box>
    );
};

export default Chart;