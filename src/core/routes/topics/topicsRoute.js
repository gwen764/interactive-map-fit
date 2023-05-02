import { TopicsPage } from "@pages";

/**
 * An object representing a route to the Topics page.
 * @memberof Core.Routes
 * @type {object}
 * @property {string} title - The title of the route.
 * @property {React.Component} component - The component to render for the route.
 * @property {string} path - The path for the route.
 * @property {boolean} exact - A boolean value indicating whether the route should match exactly or not.
 */
export default {
    title: 'Tématické shluky - Mapa FIT',
    component: <TopicsPage/>,
    path: '/topics',
    exact: true
  }