"use client";

import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import { mockProdutos } from "./mocks/produtos";

export default function App() {
  const produtos = mockProdutos;

  return (
    <main>
      <div className="container p-5">
        <ListagemProdutos produtos={produtos} />
      </div>
    </main>
  );
}
