import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { Home } from './pages/home'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CreateUser } from './pages/createUser'
import { NotFoundPage } from './pages/NotFoundPage'

const queryCliente = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  }, {
    path: "/edit/users/:userId",
    element: <CreateUser />
  }, {
    path: "/create/users/:userId",
    element: <CreateUser />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryCliente}>
    <React.StrictMode>
    <RouterProvider router={router} />
      <App />
    </React.StrictMode>
  </QueryClientProvider>
)
