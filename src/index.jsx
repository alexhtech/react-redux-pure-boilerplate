import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory'
import configureStore from './store/configureStore'
import App from './App'
import '../assets/style.sass'


const history = createHistory()


const store = configureStore()

const render = App => {
    App({history, store}).then(result => {
        ReactDOM.hydrate(
            <AppContainer>
                {result}
            </AppContainer>,
            document.getElementById('react-root')
        )
    })
}

render(App)

if (module.hot) module.hot.accept('./App', () => render(App))

export {
    history
}

