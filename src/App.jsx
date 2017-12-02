import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {renderRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import Resolver from 'react-router-resolver'
import {fetcher, cookies, settings} from 'data-fetcher'
import {fetchToState} from 'data-fetcher-redux'
import {start, success, fail} from './actions/preload'
import routes from './routes'


const App = async ({history, store}) => {
    const resolver = new Resolver({
        routes,
        store,
        history,
        actions: [
            location => {
                store.dispatch(start(location))
            },
            location => {
                store.dispatch(success(location))
            },
            (error, location) => {
                store.dispatch(fail(error, location))
            }
        ],
        helpers: {
            fetchToState,
            fetcher,
            cookies,
            settings
        },
        resolved: window.__resolvedRoutes
    })

    await resolver.resolve(history.location)

    return (
        <Provider store={store} key='provider'>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </Provider>
    )
}


function square(n: number): number {
    return n * n;
}


square('2')

export {
    App as default
}