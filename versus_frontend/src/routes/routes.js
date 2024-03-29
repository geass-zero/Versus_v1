import { Redirect } from 'react-router-dom'
import toArray from 'lodash/toArray'
import LandPage from '../Pages/LandPage/LandPage'
import HomePage from '../Pages/HomePage/HomePage';

export const Routes = {
    LandPage: {
        key: 'landPage',
        name: 'landPage',
        path: '/',
        component: LandPage,
        exact: true,
    },
    HomePage: {
        key: 'Versus',
        name: 'Versus',
        path: '/Versus/:typeId?',
        component: HomePage,
        exact: true,
    },

}

export default toArray(Routes)