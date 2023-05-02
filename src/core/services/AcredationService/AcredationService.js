import { client } from "@core/services/client";

export default {
    /**
     * @memberof Core.Services
     * @property {Function} getAcredations - Retrieves accreditations from an API.
     * @async
     * @returns {Promise} A promise that resolves with an array of accreditations.
     * @throws {Error} An error that occurred during the request to the API.
     */
    getAcredations: async function() {
        try {
            const { data } = await client.get(`/api/acredations`);
            return data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}