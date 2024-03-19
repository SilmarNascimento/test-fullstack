import { render, screen } from "@testing-library/react"
import { Home } from "../pages/home";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

test("Verifica se o texto de página não encontrada está na tela", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const text = screen.getByRole('heading', { name: /painel de clientes/i });

  expect(text).toBeInTheDocument();
})