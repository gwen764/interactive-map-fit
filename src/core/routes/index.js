import acredationRoute from "./acredations/acredationRoute";
import homeRoute from "./home/homeRoute";
import mapEntityRoute from "./map/entity/mapEntityRoute";
import mapEntityVersionsRoute from "./map/entity/versions/mapEntityVersionsRoute";
import mapRoute from "./map/mapRoute";
import topicsRoute from "./topics/topicsRoute";

/**
 * Export the routes
 * @namespace Core.Routes
 * @memberof Core
 */
export default [
    homeRoute,
    topicsRoute,
    acredationRoute,
    mapRoute,
    mapEntityRoute,
    mapEntityVersionsRoute
]