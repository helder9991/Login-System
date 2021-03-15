# Versões dos softwares utilizados:
  node v15.11.0  
  npm v7.6.0  
  mongo v4.4.4

# Introdução
  Esse é um sistema simples de login, que utiliza jwt e criptografa a senha do usuario com bcrypt.
  
  **Nota: Este é um sistema para fins didáticos, um sistema em produção não deve retornar a senha do usuario!!**

# Como utilizar
1 -  Crie o banco de dados com o nome ``sys``


2 - Rode o comando na pasta raiz do projeto:
  - ```npm```  ou ```yarn```

  Nota: Este comando irá baixar as dependências das bibliotecas (node_modules)


3 - Rode o commando na pasta raiz do projeto:
  - ```npm run dev``` ou ```yarn dev```

  Nota: Este comando irá iniciar o backend

# Rotas existentes
  **Users**
  - ```POST /users```: Cadastra um novo usuário  
  Obs: **A rota abaixo necessita que seja enviado o Bearer token**  
  - ```GET /users/:user_id```: Mostra as informações do usuario que realiza o requisição  
  

  **Auth**
  - ```POST /auth```: Realiza a autenticação do usuário


