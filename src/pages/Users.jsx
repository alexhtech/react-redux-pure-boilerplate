import React from 'react'
import {preload} from 'react-router-resolver'


@preload(() => new Promise(resolve => {
    setTimeout(resolve, 1000)
}))
export default class Users extends React.PureComponent {
    render() {
        return (
            <div>Users PureComponent</div>
        )
    }
}