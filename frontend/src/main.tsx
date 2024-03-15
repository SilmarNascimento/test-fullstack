import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './pages/home'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CreateUserForm } from './pages/createUserForm'
import { NotFoundPage } from './pages/NotFoundPage'
import { EditUserForm } from './pages/editUserForm'

const queryCliente = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  }, {
    path: "/edit/users/:userId",
    element: <EditUserForm tag={"Salvar"} />
  }, {
    path: "/create/users",
    element: <CreateUserForm tag={"Criar"} />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryCliente}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
)
