import App from '../components/App'
import Home from '../pages/Home'
import Test from '../pages/Test'


const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                component: Home,
                routes: [
                    {
                        path: '/users',
                        getComponent: () => import('../pages/Users')
                    },
                    {
                        path: '/test',
                        component: Test
                    },
                    {
                        path: '/catalog',
                        getComponent: () => import('../pages/Catalog')
                    }
                ]
            }
        ]
    }
]


export {
    routes as default
}
