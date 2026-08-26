# 🛵 Sistema de Delivery

Aplicação full stack de delivery de comida desenvolvida para simular as regras de negócio de pedidos, cardápio e pagamentos, aplicando conceitos de Programação Orientada a Objetos (POO).

---

## 🚀 Funcionalidades

- **Gerenciamento de Usuários:** Cadastro, autenticação e controle de perfis de clientes.
- **Cardápio Interativo:** Catálogo categorizado de produtos (comidas e bebidas) com cálculos dinâmicos de taxas e preparo.
- **Carrinho e Checkout:** Seleção de itens, cálculo de subtotal, frete e emissão de pedidos.
- **Formas de Pagamento:** Suporte a PIX, Cartão de Crédito e Dinheiro.

---

## 🛠️ Tecnologias

- **Front-end:** React, TypeScript, Vite, CSS / Tailwind CSS
- **Back-end:** Node.js, TypeScript

---

## 📁 Estrutura do Projeto

```text
├── backend/
│   ├── src/
│   │   ├── domain/        # Entidades e regras de negócio
|   |   |      └── interfaces/ # Subpasta para os contratos (interfaces)
│   │   └── index.ts       # Ponto de entrada do backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/               # Componentes, telas e hooks em React
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md