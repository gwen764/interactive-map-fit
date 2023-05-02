import { client } from "@core/services/client";

export default {
    /**
     * Provides a map for the specified semester.
     * @memberof Core.Services
     * @async
     * @function
     * @param {string} semester - The semester to retrieve the map for.
     * @returns {Promise} The map object.
     * @throws {Error} If the request fails.
     */
    getMapSemester: async function(semester) {
        try {
            const { data } = await client.get(`/api/map/${semester}`);
            return data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}