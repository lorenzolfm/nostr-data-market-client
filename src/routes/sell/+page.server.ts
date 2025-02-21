import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request, fetch, cookies }) => {
        const data = await request.formData();
        const id = data.get('id');
        const description = data.get('description');
        const publicKey = cookies.get('nostr_public_key');

        if (!publicKey) {
            throw redirect(303, '/login');
        }

        if (!id || !description) {
            return fail(400, {
                error: 'ID and description are required',
                values: { id, description }
            });
        }

        try {
            const response = await fetch('http://your-backend-url/api/data-sources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${publicKey}`
                },
                body: JSON.stringify({
                    id,
                    description,
                    owner: publicKey
                })
            });

            if (!response.ok) {
                return fail(400, {
                    error: 'Failed to create data source',
                    values: { id, description }
                });
            }

            throw redirect(303, '/profile');
        } catch (error) {
            return fail(500, {
                error: 'Server error',
                values: { id, description }
            });
        }
    }
} satisfies Actions;
