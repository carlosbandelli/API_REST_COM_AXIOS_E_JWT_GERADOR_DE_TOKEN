# Api de Games
Esta Api tem como finalidade, o apredizado de contrução de uma api, com banco de dados falso de exemplo
## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.
Exemplo de resposta:
```
[
        {
            id: 23,
            title: "Call of duty BO II",
            year: 2013,
            price: 60
        },
        {
            id: 65,
            title: "Kingdom Hearts",
            year: 2020,
            price: 40
        },
        {
            id: 2,
            title: "League of legends",
            year: 2021,
            price: 20
        }
    ]
    

```
##### Falha na autenticação! 401
Caso essa respota aconteça, isso significa que alguma falha durante o processo de autenticação da requisição.Motivos: token inválido, token expirado.

Exemplo de resposta:

```
{
     "err": "Token Inválido!"
}
```
### POST/auth
esse endpoint é responsavel por fazer o processo delogin
#### Parametros
email:E-mail do usuario cadastrado no sistema.

password: Senha do usuario no sistema, com aquele determinado e-mail.

Exemplo:

```

 {
            id: 1,
            name: "Carlos Bandelli",
            email: "carlosbandelliv@gmail.com",
            password: "nodejs<3"
        }

```

#### Respostas
##### ok! 200
Caso essa resposta aconteça voce vai receber a listagem de todos os games.

Exemplo de respota:
```
{
  "token":
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjYXJsb3NiYW5kZWxsaXZAZ21haWwuY29tIiwiaWF0IjoxNjIyMDc1MDIxLCJleHAiOjE2MjIyNDc4MjF9.JffFB-Ef8Sxxxk_L7NW4J7ZSojaQH1RVCk5k9NaG7b4"
}
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou email incorretos

Exemplos de resposta:
```
{
  "err": "Credencial Inválida"
}
```

