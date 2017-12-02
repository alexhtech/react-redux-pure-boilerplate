import React from 'react'
import {onEnter} from 'react-router-resolver'


@onEnter(({redirect}) => redirect('/401'))
export default class Test extends React.PureComponent {
    render() {
        return (
            <div>Test PureComponent</div>
        )
    }
}