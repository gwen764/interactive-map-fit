import { client } from "@core/services/client";


export default {
    /**
     * @memberof Core.Services
     * @property {Function} getEntity - Retrieves entity from an API.
     * @async
     * @returns {Promise} A promise that resolves with an entity object.
     * @throws {Error} An error that occurred during the request to the API.
     */
    getEntity: async function(semester, id) {
        try {
            const { data } = await client.get(`/api/entities/${semester}/${id}`);
            return data
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    /**
     * @memberof Core.Services
     * @property {Function} getEntityVersions - Retrieves entity versins from an API.
     * @async
     * @returns {Promise} A promise that resolves with an entity versions object.
     * @throws {Error} An error that occurred during the request to the API.
     */
    getEntityVersions: async function(semester, id) {
        try {
            const { data } = await client.get(`/api/entities/${semester}/${id}/versions`);
            return data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}