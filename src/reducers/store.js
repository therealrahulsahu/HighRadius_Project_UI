import { createStore } from 'redux';
// import { applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
// import logger from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))

const store = createStore(rootReducer)

export default store