import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { getToken } from './lib/auth'
import Home from './views/home'
import Login from './views/login'

const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])

const publicRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
])

const App = () => {
  const token = getToken()

  return token ? (
    <RouterProvider router={privateRouter} />
  ) : (
    <RouterProvider router={publicRouter} />
  )
}

export default App
