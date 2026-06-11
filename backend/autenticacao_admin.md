# Autenticação, Cadastro e Perfis Administrativos

## Visão geral

Este documento descreve como funciona o cadastro de usuários, o login e o controle de perfil administrativo no sistema.

A aplicação utiliza:
- Django no backend para armazenar e autenticar usuários
- Django `Group` para identificar o perfil `Administrador`
- Frontend em React para exibir páginas administrativas apenas a usuários `ADMIN`

---

## Cadastro de usuário

### Fluxo do cadastro

1. O usuário preenche o formulário de cadastro no frontend.
2. O frontend envia uma requisição `POST` para o endpoint:
   - `http://localhost:8000/api/cadastro/`
3. O backend usa o `RegistroSerializer` para validar os campos:
   - `nome_completo` → `first_name` (Django User)
   - `email`
   - `password`
   - `confirmacao_senha`
4. O backend valida:
   - e-mail único
   - senhas iguais
   - força mínima da senha
5. Se válido, o backend cria o usuário com `User.objects.create_user(...)`.

### Segurança do cadastro

- A senha não é salva em texto plano.
- O Django faz o hash automático via `create_user()`.
- O `username` do Django é preenchido com o `email` para simplificar a autenticação.

### Resultado

Após o cadastro, o usuário está registrado no banco de dados como um usuário comum (`USER`).

---

## Login de usuário

### Fluxo de login

1. O usuário preenche o formulário de login no frontend.
2. O frontend envia uma requisição `POST` para:
   - `http://localhost:8000/api/login/`
3. O backend usa `authenticate(username=email, password=password)` para validar as credenciais.
4. Se o login for válido, o backend retorna os dados do usuário.

### Identificação de admissão administrativa

Para o aplicativo, o backend determina se o usuário é administrador verificando se ele pertence ao grupo `Administrador`.

No backend, isso é feito assim:

```python
is_administrador = user.groups.filter(name__iexact='administrador').exists()
```

Se o usuário estiver no grupo, o backend retorna `is_admin: true` e `role: 'ADMIN'`.
Caso contrário, retorna `role: 'USER'`.

---

## Superuser vs usuário admin do aplicativo

### Superuser Django

O `superuser` é uma conta especial do Django que dá acesso ao painel administrativo (`/admin/`) e geralmente tem `is_staff=True` e `is_superuser=True`.

Para criar um superuser, use:

```bash
cd backend
python manage.py createsuperuser --username admin@admin.com --email admin@admin.com
```

O prompt pedirá:
- username
- email
- password


### Usuário admin do aplicativo

O aplicativo não depende apenas de `is_superuser` para decidir se o usuário pode acessar as telas administrativas.

Ele depende do grupo `Administrador`.

Assim, um usuário pode ser:
- um superuser Django (acesso `/admin/`)
- ou um usuário comum que pertence ao grupo `Administrador` (acesso às telas administrativas do app)

---

## Como criar e usar o grupo `Administrador`

### Criar o grupo no Django Admin

1. Acesse `http://localhost:8000/admin/`
2. Faça login com um superuser
3. Vá em `Groups`
4. Clique em `Add group`
5. Nomeie o grupo como `Administrador`
6. Salve o grupo

> Não é necessário atribuir permissões específicas para o app funcionar como administrador. O grupo em si já basta para o controle de acesso do frontend.

### Adicionar um usuário ao grupo

No Django Admin:
1. Acesse `Users`
2. Selecione o usuário desejado
3. Marque o grupo `Administrador`
4. Salve

## Como o frontend usa essa informação

O frontend guarda o usuário na `AuthContext` com o `role` retornado pelo backend.

Exemplo:

```ts
setUser({
  nome: responseData.nome,
  email: responseData.email,
  role: responseData.is_admin ? 'ADMIN' : 'USER',
})
```

A partir desse valor, o aplicativo usa `isAdmin` para exibir ou ocultar telas e links administrativos.

### Páginas protegidas por admin

As telas que usam `isAdmin` são, por exemplo:
- `/gerenciar-campanhas`
- `/nova-campanha`
- `/campanha-ativa`

E a `Navbar` também mostra o botão `GERENCIAR CAMPANHAS` apenas quando o usuário é `ADMIN`.

---

## Dicas finais

- Se você colocou um usuário no grupo `Administrador`, faça logout e login novamente para que a sessão atualize o perfil.
- Não confunda `Grupo Administrador` com permissões Django: para as telas do app, basta o grupo.
- Apenas crie permissões extras se você quiser controlar ações específicas no Django Admin ou no modelo de dados.
