import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { storage } from '$lib/store';

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

        console.log('creating data source', id, description, publicKey);
        console.log('oh eu vou redirect');

        throw redirect(303, '/profile');
    }
} satisfies Actions;
