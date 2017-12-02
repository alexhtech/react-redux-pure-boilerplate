import {PRELOAD_START, PRELOAD_SUCCESS, PRELOAD_FAIL} from '../constants'


const start = (location) => ({
    type: PRELOAD_START,
    payload: {
        location
    }
})

const success = location => ({
    type: PRELOAD_SUCCESS,
    payload: {
        location
    }
})

const fail = (error, location) => ({
    type: PRELOAD_FAIL,
    payload: {
        error, location
    }
})


export {
    start,
    success,
    fail
}