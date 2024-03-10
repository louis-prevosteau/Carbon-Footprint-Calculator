import { Box } from '@mui/material';
import { amber, cyan, grey } from '@mui/material/colors';
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
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '25%' }}>
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
                            backgroundColor: [cyan[800], amber[600], 'rgb(0, 0, 255)', 'rgb(0, 0, 255)', grey[500]]
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