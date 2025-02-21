import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pubkey } from '$lib/store';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { publicKey } = await request.json();
    pubkey.set(cookies, publicKey);

    return json({ success: true });
};
