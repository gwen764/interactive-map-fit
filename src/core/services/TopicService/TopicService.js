import { client } from "@core/services/client";

export default {
    /**
     * Gets a list of available topics.
     * @memberof Core.Services
     * @async
     * @function
     * @returns {Promise} An array of available topics.
     * @throws {Error} If the request fails.
     */
    getTopics: async function() {
        try {
            const { data } = await client.get(`/api/topics`);
            return data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}