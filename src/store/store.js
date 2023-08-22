import { createStore, combineReducers } from 'redux'

import { projectReducer } from './project.reducer.js'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    projectModule: projectReducer,
    systemModule: systemReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : undefined
export const store = createStore(rootReducer, middleware)

// store.subscribe(() => {
//     console.log('')
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('')
//     console.log('')
// })
