import { RouterProvider } from 'react-router-dom'
import ThemeConfig from '~/components/config/ThemeConfig'
import router from './routes'
function App() {
  return (
    <>
      <ThemeConfig>
        <RouterProvider router={router} />
      </ThemeConfig>
    </>
  )
}

export default App
