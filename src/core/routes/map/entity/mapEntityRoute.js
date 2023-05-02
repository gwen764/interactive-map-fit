import { EntityRelationsPage } from "@pages"

/**
 * An object representing a route to the Map Relations page.
 * @memberof Core.Routes
 * @type {object}
 * @property {string} title - The title of the route.
 * @property {React.Component} component - The component to render for the route.
 * @property {string} path - The path for the route.
 * @property {boolean} exact - A boolean value indicating whether the route should match exactly or not.
 */
export default {
    title: 'Závislosti entity - Mapa FIT',
    component: <EntityRelationsPage/>,
    path: '/map/:semester/entity/:id',
    exact: true,
}