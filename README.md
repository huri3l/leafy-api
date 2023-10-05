# Leafy API

Este projeto é um CRUD de usuários e produtos, uma porção de uma API para o meu TCC. Utiliza as tecnologias Node.js, Fastify, Prisma e PostgreSQL para criar aplicações web e microsserviços. Abaixo, você encontrará informações sobre como configurar e executar uma aplicação Fastify e também uma análise da pilha de tecnologias em relação às tendências e recursos.

## Tecnologias Utilizadas

- **Node.js**: Um ambiente de tempo de execução JavaScript que permite a construção de aplicativos do lado do servidor.

- **Fastify**: Um framework web rápido e eficiente para Node.js, ideal para construir APIs e servir conteúdo estático.

- **Prisma**: Uma ORM (Object-Relational Mapping) que facilita a interação com bancos de dados, como o PostgreSQL, tornando mais simples o acesso a dados dinâmicos.

- **PostgreSQL**: Um sistema de gerenciamento de banco de dados relacional de alto desempenho, adequado para microsserviços e aplicativos que requerem confiabilidade e suporte a consultas complexas.

## Como Executar a Leafy API

Siga os passos abaixo para configurar e executar uma aplicação Fastify:

1. Clone este repositório:
`git clone https://github.com/huri3l/leafy-api-fastify.git`

2. Navegue até o diretório do projeto:
`cd leafy-api-fastify`


3. Instale as dependências:
`npm install`

4. Inicie a aplicação:
`npm start`

Agora, sua aplicação Fastify deve estar em execução. Abra um navegador e acesse `http://localhost:8080[]` para visualizar a aplicação.

## Análise da Pilha de Tecnologias

### Conteúdo Estático e Renderizado no Servidor

- Node.js é adequado para renderização no servidor.
- Fastify pode servir conteúdo estático e ser usado em conjunto com outras bibliotecas para renderização no servidor.
- Prisma permite acessar bancos de dados para fornecer dados dinâmicos.

### Microsserviços

- Node.js é uma escolha comum para desenvolver microsserviços devido à sua escalabilidade.
- Fastify é eficiente e pode ser usado para criar microsserviços de baixa latência.
- Prisma facilita o gerenciamento de dados em microsserviços.
- PostgreSQL é confiável para microsserviços devido ao seu suporte a consultas complexas.

### Middleware de Aplicações Descentralizadas (Blockchain)

- Node.js é frequentemente usado para criar aplicativos que interagem com blockchains.
- Fastify pode ser usado para criar APIs que se conectam a contratos inteligentes em blockchains.
- Prisma pode ser adaptado para armazenar dados relevantes para aplicativos descentralizados em um banco de dados PostgreSQL.

Este projeto demonstra como aproveitar essas tecnologias para atender às necessidades de diferentes tipos de aplicativos e serviços.

## Documentação
A documentação do projeto foi gerada automaticamente através dos testes do Postman. Essa documentação pode ser acessada [aqui](https://documenter.getpostman.com/view/15249563/2s9YJeyMNt).