import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { storage } from "$lib/store";
import { SERVER_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ cookies }) => {
    const publicKey = storage.get(cookies);

    if (!publicKey) {
        console.log('vsf nao tem pubkey');
    }

    try {
        const response = await fetch(`${SERVER_URL}/api/get/user/${publicKey}`);

        const body = await response.json();

        return {
            user: body.nickname,
        }
    } catch (e) {
        console.error('Error fetching user data:', e);
    }
};
