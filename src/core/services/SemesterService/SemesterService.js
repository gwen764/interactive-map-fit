import { client } from "@core/services/client";


export default {
    /**
     * Gets a list of available semesters.
     * @memberof Core.Services
     * @async
     * @function
     * @returns {Promise} An array of available semesters.
     * @throws {Error} If the request fails.
     */
    getSemesters: async function() {
        try {
            const { data } = await client.get("/api/semesters");
            return data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}