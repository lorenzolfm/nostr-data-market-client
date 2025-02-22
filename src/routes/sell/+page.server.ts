import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { storage } from '$lib/store';
import { SERVER_URL } from '$env/static/private';

export const actions = {
    default: async ({ request, fetch, cookies }) => {
        const data = await request.formData();
        const id = data.get('id');
        const description = data.get('description');
        const publicKey = storage.get(cookies);

        if (!publicKey) {
            throw redirect(303, '/login');
        }

        if (!id || !description) {
            return fail(400, {
                error: 'ID and description are required',
                values: { id, description }
            });
        }

        //const res = await fetch(`${SERVER_URL}/api/sensor/register`)

        throw redirect(303, '/profile');
    }
} satisfies Actions;
