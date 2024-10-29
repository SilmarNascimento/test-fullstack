[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[REACT__BADGE]: https://img.shields.io/badge/React-005CFE?style=for-the-badge&logo=react
[JAVA__BADGE]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white
[POSTGRES__BADGE]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Docker__BADGE]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white

<h1 align="center" style="font-weight: bold;" id="top">Cadastro de Clientes 💻</h1>

<h1 align="center">

  <span>![react][REACT__BADGE]</span>
  <span>![typescript][TYPESCRIPT__BADGE]</span>
  <span>![java][JAVA__BADGE]</span>
  <span>![Postgres][POSTGRES__BADGE]</span>
  <span>![Docker][Docker__BADGE]</span>
</h1>

<p align="center">
  <a href="#about">Sobre o Projeto</a> •
  <a href="#tech">Tecnologias Utilizadas</a> •
  <a href="#started">Como Executar</a> •
  <a href="#routes">Rotas da Aplicação</a> •
  <a href="#author">Autor</a>
</p>

<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 0px;">
  <h2 id="about" style="margin: 0;">📌 Sobre o Projeto</h2>
  <a href="#top">Top</a>
</div>

<br>

Projeto web fullstack desenvolvido como parte de um teste técnico, permitindo que usuários visualizem, cadastrem e atualizem clientes. O frontend oferece uma interface intuitiva e se comunica com o backend via API. O backend gerencia e armazena os dados válidos dos clientes, garantindo uma experiência completa de gerenciamento. O deploy foi feito na AWS utilizando uma instância EC2 (free tier), com configuração de User Data para instalação automática de programas como Docker. Variáveis de ambiente foram usadas para configurar o CORS e o endpoint de requisições no frontend, gerenciadas via docker-compose. Um Security Group foi configurado para permitir a comunicação entre frontend e backend, além do acesso externo à aplicação. O armazenamento foi gerenciado com EBS para a persistência de dados da instância.

<h3>Layout Web</h3>
  <p align="center">
    <img src="./assets/cadastro-cliente-home.png" alt="Tela de listagem" width="400px">
    <img src="./assets/cadastro-cliente-create-user.png" alt="Tela de cadastro" width="400px">
  </p>

<div>
  <a href="#top" style="float: right;">Top</a>
  <h2 id="tech">🖥️ Tecnologias Utilizadas</h2>
</div>

  <h3>Front-end</h3>

- [React](https://github.com/facebook/react)
- [TypeScript](https://github.com/microsoft/TypeScript)

  <h3>Back-end</h3>

- [Java](https://www.oracle.com/java/technologies/java-se-glance.html)
- [Spring Boot](https://github.com/spring-projects/spring-boot)
- [Hibernate](https://hibernate.org/)
- [JUnit5](https://github.com/junit-team/junit5/)

  <h3>Banco de Dados</h3>

- [Postgres](https://github.com/postgres/postgres)

  <h3>Deploy</h3>

- [AWS](https://aws.amazon.com/)

<div>
  <a href="#top" style="float: right;">Top</a>
  <h2 id="started">🚀 Como Executar</h2>
</div>

<h3>Pre-requisitos</h3>

Os pré-requisitos para rodar localmente o projeto são:

- [NodeJS](https://github.com/nodejs/nodejs.org) >= 18
- [JDK 8](https://www.oracle.com/java/technologies/downloads/?er=221886)
- [Maven](https://maven.apache.org/)

O projeto também pode ser executado por containers, sendo assim os pré-requisitos são:

- [Docker](https://www.docker.com/)

<h3>Cloning</h3>

Para clonar o projeto, abra o terminal e execute o seguinte comando:

```bash
git clone git@github.com:SilmarNascimento/test-fullstack-gerenciamento-de-cliente.git
```

<h3>Executar o Projeto Localmente</h3>

Antes de iniciar o backend, é necessário subir o banco de dados PostgreSQL localmente. Se você já tem o PostgreSQL instalado, inicie o serviço e crie o banco de dados necessário para o projeto. Se preferir, pode usar o Docker para subir o banco rapidamente. Certifique-se de que o banco está rodando na porta `5432` e guarde as credenciais para configurar o backend.

Após iniciar o serviço de banco de dados, instale as dependências do backend java executando os seguintes comandos:

```bash
# entrar na pasta do backend
cd test-fullstack-gerenciamento-de-cliente/backend

# instalar as dependências do projeto
mvn clean install
```

Como a aplicação precisa se conectar a um banco de dados, será necessário configurar as credenciais corretas no arquivo de propriedades do Spring Boot. Para isso, você precisará definir as variáveis de ambiente no arquivo application-dev.properties.

```bash
# entrar na pasta de recursos do backend
cd src/main/resources
```

No arquivo application-dev.properties, você verá as seguintes configurações de conexão com o banco de dados de modo que será necessário substituir as variáveis `${DATABASE_URL}`, `${DATABASE_USERNAME}`, e `${DATABASE_PASSWORD}` pelos valores reais:

```bash
# substituir os valores abaixo pelas variáveis
spring.datasource.url=${DATABASE_URL}
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
```

Após substituir os valores no arquivo de propriedades, você pode subir a aplicação backend executando o seguinte comando:

```bash
# subir a aplicação backend
mvn spring-boot:run
```

Esse comando irá iniciar o servidor da aplicação backend. Por padrão, ele estará disponível em <http://localhost:8080>

Agora que o backend está rodando, você pode subir o frontend da aplicação. Siga os passos abaixo:

```bash
# Entrar na pasta do frontend
cd ../../../../frontend

# Instalar as dependências do frontend
npm install
```

Para iniciar o frontend da aplicação siga o seguinte comando:

```bash
# Subir a aplicação frontend
npm run dev
```

O frontend estará disponível em <http://localhost:3000> e se comunicará com o backend que está rodando em <http://localhost:8080>.

Com esses passos, o projeto estará rodando localmente com o banco de dados, backend e frontend funcionando.

<h3>Executar o Projeto com Docker</h3>

Caso queira executar o projeto usando docker, após clonar o projeto, abra o arquivo docker-compose.yaml na raiz do projeto e edite as variáveis de ambiente no serviço de backend para a conexão com o banco de dados. Para a configuração dos endpoints para a requisição do frontend e configuração do CORS da aplicação, renomeie o arquivo `.env.exemple` para `.env` e altere as variáveis abaixo se necessário:

```bash
# Frontend environment variables
VITE_BACKEND_DOMAIN=localhost
VITE_BACKEND_PORT=8080

# Backend environment variables
FRONTEND_DOMAIN=localhost
FRONTEND_PORT=3000
```

Após a configuração das variáveis de ambiente, abra o terminal e execute as instruções abaixo:

```bash
# entrar na pasta raiz do projeto e executar o comando docker
cd test-fullstack-gerenciamento-de-cliente
docker-compose up -d
```

O frontend estará disponível em <http://localhost:3000> e se comunicará com o backend que está rodando em <http://localhost:8080>.

<div>
  <a href="#top" style="float: right;">Top</a>
  <h2 id="routes">📍 Rotas da Aplicação</h2>
</div>

<h3 id="route-frontend">Rotas do Frontend</h3>

Na tabela abaixo encontra-se as rotas de cada página do frontend e suas descrições:
​

| URL               | Descrição
|----------------------|-----------------------------------------------------
| <kbd>/</kbd>     | página para listar todos os usuários cadastrados
| <kbd>/create/users</kbd>     | página para cadastrar um novo usuário
| <kbd>/edit/users/:userId</kbd>     | página para editar um usuário já cadastrado

<h3 id="route-backend">Rotas do Backend (API)</h3>

Na tabela abaixo encontra-se os endpoints da API e suas descrições:
​

| Método          | URL     | Descrição
|-----------------|-----|-----------------------------------------------------
| `GET` | <kbd>/api/users</kbd>     | endpoint para listar os usuários cadastrados em páginas
| `GET` | <kbd>/api/users/:userId</kbd>     | endpoint para recuperar um usuário pelo seu Id
| `POST` | <kbd>/api/users</kbd>     | endpoint para cadastrar um usuário
| `PUT` | <kbd>/api/users/:userId</kbd>     | endpoint para alterar algum atributo de um cliente

Para mais detalhes sobre as rotas da API e exemplos detalhados de requisições e respostas, [clique aqui](./backend/API_DOCUMENTATION.md)

<div>
  <a href="#top" style="float: right;">Top</a>
  <h2 id="author">📝 Autor</h2>
</div>

Silmar Fernando do Nascimento

[Linkedin](https://www.linkedin.com/in/silmarnascimento/)
