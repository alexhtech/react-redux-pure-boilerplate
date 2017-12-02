const isBrowser = require('is-browser')


class Config {
    constructor() {
        // eslint-disable-next-line no-undef
        const {NODE_ENV = 'production', ...rest} = isBrowser ? config : process.env
        this.env = rest
        this.baseConfig = require(`./config.${NODE_ENV}.json`)
        this.config = {}
        this.build(this.env, this.baseConfig) // build by vars of environment
        this.build(this.baseConfig, this.env) // build by vars of config.${env}.json
        this.setAuxiliaryProperties()
    }

    build = (v1, v2) => {
        Object.keys(v1).forEach((k) => {
            if (Object.prototype.hasOwnProperty.call(v1, k) && /^APP_/.test(k)) {
                this.set(k, v2[k] || v1[k])
            }
        })
    }

    setAuxiliaryProperties = () => {
        const {get, set} = this
        set('APP_API_ORIGIN', `http${get('HTTPS') ? 's' : ''}://${get('APP_API_DOMAIN')}`)
        set('APP_API_BASE_URL', get('APP_API_ORIGIN') + get('APP_API_PREFIX'))
    }

    set = (key, value) => {
        this.config[key] = value
    }

    get = key => this.config[key] || ''
    getConfig = () => this.config
}


const {getConfig} = new Config()

export {
    getConfig as default
}
