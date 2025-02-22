// src/routes/buy/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { storage } from '$lib/store';

// Mock data - replace with actual API call
const mockDataSources = {
    "!1325302301": {
        id: "!1325302301",
        description: "George''s House( Lagoa) - temperature humidity",
        owner: "b992c5571aec8feb2f1eed537e3a0bcaaf87c95d8cb0ae9c726e9f3630c36f4e",
        price: "5",
        location: "ACATE",
        updateFrequency: "10 secs"
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
