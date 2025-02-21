// src/routes/buy/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { storage } from '$lib/store';

// Mock data - replace with actual API call
const mockDataSources = {
    "temp_sensor_001": {
        id: "temp_sensor_001",
        description: "Temperature sensor in downtown area. Updates every 5 minutes with precision of 0.1°C",
        owner: "npub1abc...",
        price: "5",
        location: "Downtown",
        updateFrequency: "5 min"
    },
    "humidity_243": {
        id: "humidity_243",
        description: "Humidity sensor with high accuracy. Provides real-time data for agricultural applications.",
        owner: "npub2xyz...",
        price: "8",
        location: "Agricultural Zone",
        updateFrequency: "1 min"
    }
};

export const load: PageServerLoad = async ({ params, cookies }) => {
    const publicKey = storage.get(cookies);

    if (!publicKey) {
        throw error(401, 'Unauthorized');
    }

    // In real implementation, fetch from your backend:
    // const response = await fetch(`http://your-backend-url/api/data-sources/${params.id}`);
    // const sensor = await response.json();

    const sensor = mockDataSources[params.id];

    if (!sensor) {
        throw error(404, 'Sensor not found');
    }

    return {
        sensor
    };
};
