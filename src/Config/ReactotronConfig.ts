import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

let reactotron = Reactotron.configure({
  name: 'Pleo Mobile Challenge'
})
  .useReactNative()
  .use(reduxPlugin())
  .use(sagaPlugin({}))

if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}

export default reactotron
