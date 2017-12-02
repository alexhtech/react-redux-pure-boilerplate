import React from 'react'
import LoadingBar from 'react-redux-loading-bar'
import {Helmet} from 'react-helmet'
import {renderRoutes} from 'react-router-config'
import {setBaseUrl, setRefreshTokenName, setTokenName, setTokenPrefix} from 'data-fetcher'
import getConfig from '../../../config'


export default class App extends React.Component {
    constructor() {
        super();
        const isDev = process.env.NODE_ENV === 'development'
        this.links = [{
            rel: 'icon',
            type: 'image/png',
            href: require('../../../assets/favicon.png'),
            sizes: '150x150'
        }]
        if (!isDev) {
            this.links.push({
                href: '/public/style.css',
                type: 'text/css',
                rel: 'stylesheet'
            })
        }
    }

    componentDidMount = () => {
        const {
            APP_TOKEN_NAME,
            APP_REFRESH_TOKEN_NAME,
            APP_TOKEN_PREFIX,
            APP_API_BASE_URL
        } = getConfig()

        setTokenName(APP_TOKEN_NAME)
        setTokenPrefix(APP_TOKEN_PREFIX)
        setRefreshTokenName(APP_REFRESH_TOKEN_NAME)
        setBaseUrl(APP_API_BASE_URL)
    }

    style = {
        backgroundColor: '#f00',
        top: 0,
        height: '1px',
        zIndex: '10000',
        position: 'fixed',
        boxShadow: '1px 1px 4px 0px rgba(50, 50, 50, 0.75)'
    }

    render() {
        return (
            <div>
                <LoadingBar style={this.style} updateTime={50} progressIncrease={50}/>
                <Helmet>
                    <title>React Application</title>
                    {this.links.map(item => <link {...item} key={item.href}/>)}
                </Helmet>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}