// src/routes/buy/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pubkey } from '$lib/store';

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
    pubkey.get(cookies);

    if (!pubkey) {
        throw error(401, 'Unauthorized');
    }

    // In real implementation, fetch from your backend:
    // const response = await fetch('http://your-backend-url/api/data-sources');
    // const dataSources = await response.json();

    return {
        dataSources: mockDataSources
    };
};
