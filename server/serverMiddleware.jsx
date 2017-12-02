import React from 'react'
import {renderToString} from 'react-dom/server'
import {Helmet} from 'react-helmet'
import createHistory from 'history/createMemoryHistory'
import {renderRoutes} from 'react-router-config'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import {ServerStyleSheet} from 'styled-components'
import Resolver from 'react-router-resolver'
import {Cookies, Settings, Fetcher, stringifyQuery} from 'data-fetcher'
import configureStore from './configureStore'
import routes from '../src/routes'
import getConfig from '../config'
import page from './page'

import 'isomorphic-fetch'




const config = getConfig()


const serverMiddleware = async (req, res) => {
    try {
        const cookies = new Cookies()
        const settings = new Settings({
            token: config.APP_TOKEN_NAME,
            refreshToken: config.APP_REFRESH_TOKEN_NAME,
            tokenPrefix: config.APP_TOKEN_PREFIX,
            baseUrl: config.APP_API_BASE_URL
        }, cookies)
        const fetcher = new Fetcher(settings)
        const location = {
            pathname: req.path,
            search: stringifyQuery(req.query)
        }
        const store = configureStore()
        const history = createHistory({
            initialEntries: [req.url]
        })
        const sheet = new ServerStyleSheet()
        const resolver = new Resolver({
            store,
            routes,
            history,
            helpers: {
                fetcher,
                cookies,
                settings
            },
            actions: [
                () => {
                    console.log('start')
                },
                () => {
                    console.log('success')
                },
                () => {
                    console.log('fail')
                }
            ]
        })

        await resolver.resolve(location)

        const html = renderToString(
            sheet.collectStyles(
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        {renderRoutes(routes)}
                    </ConnectedRouter>
                </Provider>
            ))

        const helmet = Helmet.renderStatic()
        const css = sheet.getStyleTags()
        res.status(200).send(page({
            state: store.getState(),
            helmet,
            html,
            css,
            config,
            resolved: resolver.getResolved()
        }))
    } catch (error) {
        if (error.type === 'redirect') {
            res.redirect(error.to.pathname + stringifyQuery(error.to.query))
        }
        console.log(error)
    }
}

export default serverMiddleware
