import type { Cookies } from "@sveltejs/kit";

const COOKIE_NAME = "__session";

function createNostrUser() {
    function get(cookies: Cookies): string | undefined {
        return cookies.get(COOKIE_NAME);
    }

    function set(cookies: Cookies, pubkey: string) {
        cookies.set(COOKIE_NAME, pubkey, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
        });
    }

    function purge(cookies: Cookies) {
        cookies.delete(COOKIE_NAME, { path: "/" });
    }

    return {
        get,
        set,
        purge,
    };
}

export const pubkey = createNostrUser();
