import { DashboardPage, RegisterPage, LandingPage } from './pages'

import {
  createBrowserRouter,
  // Link,
  // Route,
  RouterProvider,
  // Routes,
} from 'react-router-dom'
import ErrorPage from './pages/error'
import axios from 'axios'

const router = createBrowserRouter([
  { path: '/', Component: DashboardPage },
  { path: '/register', Component: RegisterPage },
  { path: '/landing', Component: LandingPage },
  { path: '*', Component: ErrorPage },
])

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
