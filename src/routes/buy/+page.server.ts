// src/routes/buy/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { storage } from '$lib/store';
import { SERVER_URL } from '$env/static/private';

// Mock data - replace with actual API call
const mockDataSources = [
    {
        id: "temp_sensor_001",
        description: "Temperature sensor in downtown area. Updates every 5 minutes with precision of 0.1°C",
        owner: "npub1abc...",
        price: "1",
        location: "Downtown",
        updateFrequency: "5 min"
    },
    {
        id: "humidity_243",
        description: "Humidity sensor with high accuracy. Provides real-time data for agricultural applications.",
        owner: "npub2xyz...",
        price: "2",
        location: "Agricultural Zone",
        updateFrequency: "1 min"
    },
    {
        id: "air_quality_15",
        description: "Air quality monitoring station measuring PM2.5, PM10, and CO2 levels.",
        owner: "npub3def...",
        price: "3",
        location: "Industrial Area",
        updateFrequency: "10 min"
    }
];

export const load: PageServerLoad = async ({ cookies, fetch }) => {
    const res = await fetch(`${SERVER_URL}/api/list-sensors`);

    const data = (await res.json()).sensors;

    const sensors = data.map((sensor) => {
        return {
            id: sensor.id,
            description: sensor.description,
            owner: sensor.owner_pubkey,
            price: Math.floor(Math.random() * 10) + 1,
            location: 'ACATE',
            updateFrequency: '10 secs'
        }
    })

    return {
        dataSources: sensors
    };
};
