# E-commerce Front-end Challenge

Este projeto é a implementação do front-end para o desafio técnico de e-commerce, utilizando Next.js, TypeScript e shadcn/ui.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Componentes de UI)
- **Zustand** (Gerenciamento de estado global)
- **Axios** (Cliente HTTP)
- **Lucide React** (Ícones)

## 🛠️ Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm/yarn
- Backend rodando na porta 3000 (ou configure a URL no `.env`)

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente (opcional se o backend estiver em localhost:3000):

Crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🏃‍♂️ Rodando o Projeto

```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:3001` (ou outra porta se a 3000 estiver ocupada pelo backend).

## 📂 Estrutura do Projeto

- `/app`: Páginas e layouts do Next.js
- `/components`: Componentes React reutilizáveis
  - `/ui`: Componentes do shadcn/ui
- `/services`: Serviços de API (Axios)
- `/store`: Gerenciamento de estado (Zustand)
- `/types`: Definições de tipos TypeScript
- `/lib`: Utilitários

## ✨ Funcionalidades

- **Listagem de Produtos**: Exibição de produtos em grid.
- **Detalhes do Produto**: Página dedicada com informações detalhadas.
- **Carrinho de Compras**: Sidebar interativa para gerenciar itens do carrinho.
- **Adicionar/Remover**: Funcionalidade completa de carrinho.
- **Responsividade**: Layout adaptável para mobile e desktop.
