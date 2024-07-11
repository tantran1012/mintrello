import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import ThemeConfig from '~/components/config/ThemeConfig'
import store from './redux/store'
import router from './routes'
function App() {
  return (
    <>
      <ThemeConfig>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeConfig>
    </>
  )
}

export default App
