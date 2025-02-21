import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { storage } from '$lib/store';
import { SERVER_URL } from '$env/static/private';

export const load = async ({ cookies }) => {
    const pubkey = storage.get(cookies);

    if (!pubkey) {
        throw redirect(303, '/login');
    }

    return { pubkey };
};

export const actions = {
    default: async ({ request, fetch }) => {
        const data = await request.formData();
        const nickname = data.get('nickname');
        const pubkey = data.get('pubkey');

        console.log(pubkey, nickname);

        if (!nickname) {
            return fail(400, {
                error: 'Nickname is required',
                values: { nickname }
            });
        }

        try {
            const response = await fetch(`${SERVER_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pubkey,
                    nickname,
                })
            });

            if (!response.ok) {
                return fail(400, {
                    error: 'Failed to register',
                    values: { nickname }
                });
            }

            throw redirect(303, '/profile');
        } catch (error) {
            return fail(500, {
                error: 'Server error',
                values: { nickname }
            });
        }
    }
} satisfies Actions;

