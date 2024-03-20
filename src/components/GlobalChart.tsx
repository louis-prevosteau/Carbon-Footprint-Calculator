import { Box } from '@mui/material';
import { lime } from '@mui/material/colors';
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
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

const GlobalChart = ({ footprint }: { footprint: number }) => {

    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', width: '35%' }}>
            <Bar
                data={{
                    labels: [t('chart.totalFootprint')],
                    datasets: [
                        {
                            label: t('chart.footprintAdornment'),
                            data: [footprint],
                            backgroundColor: [lime['A200']]
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 500
                            }
                        }
                    },
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
                        },
                        title: {
                            display: true,
                            text: t('chart.global')
                        }
                    }
                }}
            />
        </Box>
    );
};

export default GlobalChart;