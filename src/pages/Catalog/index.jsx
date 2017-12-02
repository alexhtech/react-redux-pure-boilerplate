import React from 'react'
import {renderRoutes} from 'react-router-config'
import Items from './Items'


export default class Catalog extends React.PureComponent {
    static routes = [
        {
            path: '/catalog/items',
            component: Items,
            preload: () => new Promise(res => {
                setTimeout(() => {
                    res()
                }, 500)
            }),
            preloadOptions: {
                alwaysReload: true
            }
        }
    ]

    render() {
        return (
            <div>
                <div>Catalog PureComponent</div>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}