# Guia de Instalação e Deploy

Este é um guia passo a passo para configurar, executar e fazer o deploy da sua aplicação.

## Requisitos

Antes de começar, certifique-se de que você possui os seguintes requisitos instalados:

- Yarn
- Node.js
- npm (Node Package Manager)
- TypeScript
- Nodemon (opcional, apenas para desenvolvimento)
- Sequelize CLI (para migrações de banco de dados)
- Jest (para testes)
- ESLint (para linting de código)

## Instalação

1. Clone o repositório

2. Acesse a pasta do projeto

3. Instale as dependências

```
yarn install
```

## Configuração do Banco de Dados

1. Certifique-se de que você tenha um banco de dados configurado. Edite o arquivo de .env conforme necessário.

2. Execute o comando para criar o banco de dados:

```
yarn db:create
```

3. Execute as migrações do banco de dados para criar as tabelas:

```
yarn db:migrate
```

4. Opcional: Se você precisar de dados de exemplo, execute as sementes (seeds) do banco de dados:

```
yarn db:seed
```

## Executando a Aplicação (Desenvolvimento)

1. Para iniciar a aplicação em modo de desenvolvimento com atualização automática, execute o seguinte comando:

```
yarn dev
```

2. A aplicação estará disponível em `http://localhost:5000` (ou outra porta, se configurada).

## Testes

1. Para executar os testes usando o Jest, execute o seguinte comando:

```
yarn test
```

## Linting

1. Para verificar a qualidade do código e aplicar correções automáticas, execute o seguinte comando:

```
yarn lint
```

2. Para aplicar correções automaticamente, execute o seguinte comando:

```
yarn lint:fix
```

## Deploy

1.No Servidor, executar:

```
yarn build
```

```
yarn start
```
