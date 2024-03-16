import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './pages/home'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import { EditUser } from './pages/editUser'
import { CreateUser } from './pages/createUser'

const queryCliente = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  }, {
    path: "/edit/users/:userId",
    element: <EditUser />,
    errorElement: <NotFoundPage />
  }, {
    path: "/create/users",
    element: <CreateUser />,
    errorElement: <NotFoundPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryCliente}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
)
