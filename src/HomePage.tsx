// src/HomePage.js
import React, { useState, useEffect } from 'react';
import fetchData from './services/fetchData';
import 'date-fns'
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';


ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const HomePage = () => {
    const [data, setData] = useState<any[]>([]);
    const [hours, setHours] = useState(1);

    useEffect(() => {
        const getData = async () => {
            const newData = await fetchData(hours);
            setData(newData);
        };
        getData();
    }, [hours]);


    const dataForGraph = {
        labels: data.map(d => new Date(d.createdAt.seconds * 1000)),
        datasets: [
            {
                label: 'WiFi Devices',
                data: data.map(d => parseInt(d['estimate'])),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    return (
        <div style={{ color: '#000', padding: '20px' }}>
            <h1>Latest WiFi Device Count: {data[data.length - 1]?.['estimate'] || 'Loading...'}</h1>
            <div>
                <button onClick={() => setHours(1)}>Last Hour</button>
                <button onClick={() => setHours(6)}>Last 6 Hours</button>
                <button onClick={() => setHours(24)}>Last 24 Hours</button>
            </div>
            <div>
                <Line data={dataForGraph} options={{
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute',
                            },
                            ticks: {
                                stepSize: 15,
                                autoSkip: true,
                            },
                        },
                        y: {
                            beginAtZero: true,
                        },
                    }
                }} />
            </div>
        </div>
    );
};

export default HomePage;
