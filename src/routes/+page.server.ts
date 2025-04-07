import { DATABASE } from "../hooks.server";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return { tasks: DATABASE };
};

const CREATE_FAILURE = "Přidání úkolu selhalo!";
const CREATE_SUCCESS = "Přidání úkolu proběhlo v pořádku!";

export const actions: Actions = {
    create_task: async ({ request }) => {
        const form_data = await request.formData();
        const task = form_data.get("task");

        if (task === null || task === "")
            return { success: false, message: CREATE_FAILURE };

        DATABASE.push(task.toString());

        return { success: true, message: CREATE_SUCCESS };
    },

    remove_task: async ({ url }) => {
        const task_index = url.searchParams.get("index");
        if (task_index === null)
            return { success: false, message: "Error" };

        const task_index_number = +task_index;
        if (Number.isNaN(task_index_number))
            return { success: false, message: "Error" };

        DATABASE.splice(task_index_number, 1);

        return { success: true, message: "Vymazání proběhlo úspešně." };
    }
};