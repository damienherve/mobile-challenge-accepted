import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import { AsyncStorage } from 'react-native'

let reactotron = Reactotron.configure({
  name: 'Pleo Mobile Challenge'
})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(reduxPlugin())
  .use(sagaPlugin({}))

if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}

export default reactotron
