import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const BACKEND_URL = 'localhost:5000'

export const load: PageServerLoad = async ({ cookies }) => {
    const publicKey = cookies.get('nostr_public_key');

    if (!publicKey) {
        console.log('vsf nao tem pubkey');
    }

    try {
        /*
        const response = await fetch(`${BACKEND_URL}/user/${publicKey}`, {
            headers: {
                'Authorization': `Bearer ${publicKey}`
            }
        });

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch user data');
        }

        const userData = await response.json();
        */

        return {
            user: "Alex",
        };
    } catch (e) {
        console.error('Error fetching user data:', e);
    }
};
