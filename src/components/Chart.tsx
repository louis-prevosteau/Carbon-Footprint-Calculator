import { Box } from '@mui/material';
import { amber, cyan, grey } from '@mui/material/colors';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
);

const Chart = ({ data }: { data: number[] }) => {

    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '85%' }}>
            <Bar
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
                        },
                        annotation: {
                            annotations: {
                                limit: {
                                    type: 'line',
                                    scaleID: 'y',
                                    value: 2000,
                                    borderColor: 'red',
                                    borderWidth: 5,
                                    label: {
                                        content: t('chart.target'),
                                        display: true
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 500
                            }
                        }
                    }
                }}
            />
        </Box>
    );
};

export default Chart;