import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { rootSaga, rootReducer } from '@Store'
import createSagaMiddleware from 'redux-saga'
import Reactotron from './ReactotronConfig'

// Reactotron
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: Reactotron.createSagaMonitor()
})

let middlewares = compose(
  applyMiddleware(sagaMiddleware)
  // Add other middlewares here if needed
)

if (__DEV__ && Reactotron.createEnhancer) {
  middlewares = compose(middlewares, Reactotron.createEnhancer())
}

export const store = createStore(rootReducer, middlewares)

sagaMiddleware.run(rootSaga)
