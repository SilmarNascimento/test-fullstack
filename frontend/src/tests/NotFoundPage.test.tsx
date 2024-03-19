import { render, screen } from "@testing-library/react"
import { NotFoundPage } from "../pages/NotFoundPage"

test("Verifica se o texto de página não encontrada está na tela", () => {
  render(<NotFoundPage />);

  const text = screen.getByRole("heading", { level: 1});

  console.log("component capturado: ", text);
  

  expect(text).toBeInTheDocument();
})