import { AcredationsPage } from "@pages"

/**
 * An object representing a route to the Acredation page.
 * @memberof Core.Routes
 * @type {object}
 * @property {string} title - The title of the route.
 * @property {React.Component} component - The component to render for the route.
 * @property {string} path - The path for the route.
 * @property {boolean} exact - A boolean value indicating whether the route should match exactly or not.
 */
export default {
    title: 'Přehled studia - Mapa FIT',
    component: <AcredationsPage/>,
    path: '/acredations',
    exact: true
}