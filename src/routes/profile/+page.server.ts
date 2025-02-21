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
        return {
            user: "Alex",
        };
    } catch (e) {
        console.error('Error fetching user data:', e);
    }
};
