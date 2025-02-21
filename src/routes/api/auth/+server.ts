import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { storage } from '$lib/store';
import { SERVER_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const pubkey = storage.get(cookies);

    if (!pubkey) {
        const pubkey = await request.json();
        storage.set(cookies, pubkey);
    }

    const res = await fetch(`${SERVER_URL}/api/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pubkey }),
        method: 'POST',
    });

    const body = await res.json();

    return json(body);
};
