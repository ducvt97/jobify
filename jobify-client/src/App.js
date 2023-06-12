import { RegisterPage, LandingPage } from './pages'

import {
  createBrowserRouter,
  // Link,
  // Route,
  RouterProvider,
  // Routes,
} from 'react-router-dom'
import ErrorPage from './pages/error'
import axios from 'axios'
import { AddJobPage, AllJobsPage, ProfilePage, StatsPage, SharedLayout, ProtectedRoute } from './pages/dashboard'

const router = createBrowserRouter([
  { path: '/',
    element: <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>,
    children: [
      { index: true, element: <StatsPage /> },
      { path: 'all-jobs', element: <AllJobsPage /> },
      { path: 'add-job', element: <AddJobPage />  },
      { path: 'profile', element: <ProfilePage /> },
    ]
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/landing', element: <LandingPage /> },
  { path: '*', element: <ErrorPage /> },
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
