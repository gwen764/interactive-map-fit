/**
 * Returns the home route.
 * @function
 * @memberof Core.Utils
 * @returns {string} The home route.
 */
const homeRoute = () => {
    return '/'
}

/**
 * Returns the map route for a specific semester.
 * @function
 * @memberof Core.Utils
 * @param {string} semester - The semester for which to generate the map route.
 * @returns {string} The map route for the specified semester.
 */
const mapRoute = (semester) => {
    return `/map/${semester}`
}

/**
 * Returns the map entity route for a specific semester and entity.
 * @function
 * @memberof Core.Utils
 * @param {string} semester - The semester for which to generate the map entity route.
 * @param {string} entity - The entity for which to generate the map entity route.
 * @returns {string} The map entity route for the specified semester and entity.
 */
const mapEntityRoute = (semester, entity) => {
    return `/map/${semester}/entity/${entity}`
}

/**
 * Returns the map entity versions route for a specific semester and entity.
 * @function
 * @memberof Core.Utils
 * @param {string} semester - The semester for which to generate the map entity versions route.
 * @param {string} entity - The entity for which to generate the map entity versions route.
 * @returns {string} The map entity versions route for the specified semester and entity.
 */
const mapEntityVersionsRoute = (semester, entity) => {
    return `/map/${semester}/entity/${entity}/versions`
}

/**
 * Returns the accreditations route.
 * @function
 * @memberof Core.Utils
 * @returns {string} The accreditations route.
 */
const acredationsRoute = () => {
    return `/acredations`
}

/**
 * Returns the topics route.
 * @function
 * @memberof Core.Utils
 * @returns {string} The topics route.
 */
const topicsRoute = () => {
    return `/topics`
}

export {
    homeRoute,
    mapRoute,
    mapEntityRoute,
    mapEntityVersionsRoute,
    acredationsRoute,
    topicsRoute
}