import React from 'react'
import {renderRoutes} from 'react-router-config'
import Navigation from '../components/Navigation'


export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}

