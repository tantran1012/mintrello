import { createBrowserRouter } from 'react-router-dom'
import guestRoute from './guest-route'

const router = createBrowserRouter([...guestRoute])

// console.log(guestRoute);
export default router
