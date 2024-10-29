<h1 id="top">Documentação da API</h1>

Esse documento contém uma descrição detalhada de cada endpoint disponível na API, incluindo os métodos HTTP, URLs, parâmetros esperados, exemplos de requisições, respostas e erros.

## Resumo dos endpoints

As rotas da aplicação podem ser visualizadas segundo a tabela abaixo.

| Método          | URL     | Descrição
|-----------------|-----|-----------------------------------------------------
| `GET` | <kbd>/api/users</kbd>     | endpoint para listar os usuários cadastrados em páginas
| `GET` | <kbd>/api/users/:userId</kbd>     | endpoint para recuperar um usuário pelo seu Id
| `POST` | <kbd>/api/users</kbd>     | endpoint para cadastrar um usuário
| `PUT` | <kbd>/api/users/:userId</kbd>     | endpoint para alterar algum atributo de um cliente

## Detalhamento dos endpoints

<div>
  <h3 id="routes">GET /api/users</h3></h3>
  <a href="#top">Top</a>
</div>

<br>

Retorna uma lista paginada de todos os usuários cadastrados.

**Parâmetros:**

- `pageNumber` (int, opcional, padrão: 0): Número da página a ser retornada.
- `pageSize` (int, opcional, padrão: 20): Quantidade de itens por página.

**Exemplo de requisição:**

```bash
GET /api/users?pageNumber=0&pageSize=20
Content-Type: application/json
```

**Exemplo de Resposta:**

```bash
200 OK
Content-Type: application/json

{
  "pageItems": 2,
  "totalItems": 50,
  "pages": 25,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "cpf": "12345678901",
      "telephone": "1234567890",
      "status": "ACTIVE"
    },
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "cpf": "98765432109",
      "telephone": "0987654321",
      "status": "INACTIVE"
    }
  ]
}
```

<br>

<div>
  <h3 id="routes">POST /api/users</h3></h3>
  <a href="#top">Top</a>
</div>

<br>

Cria um novo usuário.

**Parâmetros:**

- `name` (string, obrigatório): Nome do usuário.
- `email` (string, obrigatório): Email do usuário.
- `cpf` (string, obrigatório): CPF do usuário. Deve ter exatamente 11 caracteres.
- `telephone` (string, obrigatório): Número de telefone do usuário.
- `status` (string, obrigatório): Status do usuário. Podem ser: `ATIVO`, `INATIVO`, `AGUARDANDO_ATIVACAO`, `DESATIVADO`.

**Exemplo de requisição:**

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "cpf": "12345678901",
  "telephone": "1234567890",
  "status": "ACTIVE"
}
```

**Exemplo de Resposta:**

```bash
201 Created
Content-Type: application/json

{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "cpf": "12345678901",
  "telephone": "1234567890",
  "status": "ACTIVE"
}
```

**Possíveis Erros:**

- `400` (Bad Request): Usuário já cadastrado.

```bash
400 Bad Request
Content-Type: application/json

"Usuário já cadastrado!"
```

- `400` (Bad Request): Email já cadastrado.

```bash
400 Bad Request
Content-Type: application/json

"Email já cadastrado!"
```

<br>

<div>
  <h3 id="routes">PUT /api/users/{userId}</h3></h3>
  <a href="#top">Top</a>
</div>

<br>

Atualiza as informações de um usuário existente pelo ID.

**Parâmetros:**

- `userId` (UUID, obrigatório): Identificador único do usuário.
- `name` (string, obrigatório): Nome do usuário.
- `email` (string, obrigatório): Email do usuário.
- `cpf` (string, obrigatório): CPF do usuário. Deve ter exatamente 11 caracteres.
- `telephone` (string, obrigatório): Número de telefone do usuário.
- `status` (string, obrigatório): Status do usuário. Podem ser: `ATIVO`, `INATIVO`, `AGUARDANDO_ATIVACAO`, `DESATIVADO`.

**Exemplo de requisição:**

```bash
PUT /api/users/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "johndoeupdated@example.com",
  "cpf": "12345678901",
  "telephone": "0987654321",
  "status": "ACTIVE"
}
```

**Exemplo de Resposta:**

```bash
200 OK
Content-Type: application/json

{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe Updated",
  "email": "johndoeupdated@example.com",
  "cpf": "12345678901",
  "telephone": "0987654321",
  "status": "ACTIVE"
}
```

**Possíveis Erros:**

- `404` (Not Found): Usuário não encontrado.

```bash
404 Not Found
Content-Type: application/json

"Usuário não encontrado!"
```

<br>

<div>
  <h3 id="routes">DELETE /api/users/{userId}</h3></h3>
  <a href="#top">Top</a>
</div>

<br>

Deleta um usuário pelo ID.

**Parâmetros:**

- `userId` (UUID, obrigatório): Identificador único do usuário.

**Exemplo de requisição:**

```bash
DELETE /api/users/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json
```

**Exemplo de Resposta:**

```bash
204 No Content
Content-Type: application/json
```

**Possíveis Erros:**

- `404` (Not Found): Usuário não encontrado.

```bash
404 Not Found
Content-Type: application/json

"Usuário não encontrado!"
```
