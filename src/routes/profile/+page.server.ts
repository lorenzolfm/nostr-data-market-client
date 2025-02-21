import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (
) => {

    return { lero: "lero" }
};
