const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")


const JWTSecret = "huashuashuas"

app.use(cors())
app.use(express.urlencoded({extend: false}))
app.use(express.json())

function auth(req, res, next){ // middleware ´euma função executada antes da sua requisição ser executada

    const authToken = req.headers['authorization']

    if(authToken != undefined){

        const bearer = authToken.split(' ')
        var token = bearer[1] //para pegar a posição de numero 1 no array
        
        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.status(401)
                res.json({err: "Token inválido!"})
            }else{
                req.token = token
                req.loggerUser = {id: data.id,email: data.email}
                req.empresa = 'Si-Fy'
                next()
            }
        })
        
    }else{
        res.status(401)
        res.json({err:"Token invalido!"})
    }

    
}

var DB = {
    games:[
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
    ],
    users:[
        {
            id: 1,
            name: "Carlos Bandelli",
            email: "carlosbandelliv@gmail.com",
            password: "nodejs<3"
        },
        {
           
            id: 20,
            name: "Bruno Bandelli",
            email: "BrunoBandelli@gmail.com",
            password: "java123"

        }
    ]

}





app.get("/games",auth,(req,res) => { //get para pegar dados, quandoa rota for acessada,ela pega todas as listagens
    
    res.statusCode = 200 //significa que arota foi criado com sucesso
    res.json(DB.games) //vai acessar a listagem de games, pois o DB.games é a variavel
})

app.get("/game/:id",auth, (req,res) =>{
    if(isNaN(req.params.id)){
        res.sendStatus(400) // status que retorno quando ele não usar um numero
    }else{

        var id = parseInt(req.params.id)// conversão do id para numero inteiro

        var game = DB.games.find(g => g.id == id) //

        if(game != undefined){
            res.statusCode = 200; //responde quando o id existe
            res.json(game)//retorna em Json o que esta no ID existente 
        }else{
            res.sendStatus(404)// retorna quando o id não existe
        }
    }
})

app.post("/game",auth,(req,res) => { //pode existir a mesma rota porem com metodos diferentes estilo GET E POST
    
    var {title,price,year} = req.body //req.body serve para qualquer dado que serve para requisição post

    DB.games.push({
        id: 2323, // id é gerado automatico porem nesse casso estamos usando um banco de dados falso, por isso adicionamos o metodos push que serve para adicinonar em um array
        title,
        price,
        year
    })

    res.sendStatus(200) //quando der tudo certoeel aparece esse STATUS

})

app.delete("/game/:id",auth,(req, res) => { // igual o metodo get
    if(isNaN(req.params.id)){
        res.sendStatus(400) // status que retorno quando ele não usar um numero
    }else{

        var id = parseInt(req.params.id)// conversão do id para numero inteiro

        var index = DB.games.findIndex(g => g.id == id) //significa que ele ta verirficando se existe algum game id que qtenha o mesmo id dá variavel var id

        if(index == -1){
            res.sendStatus(404) //responde quando o id existe
            
        }else{
            DB.games.splice(index,1)// esse metodo splice signica assim quero deletar do index apenas 1 elemento, por isso o numero 1
            res.sendStatus(200)// retorna quando tudo ok
        }
    }
})

app.put("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            
            var {title, price,year} = req.body

            if(title != undefined){
                game.title = title                
            }
            if(price != undefined){
                game.price = price
            }
            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)
            
        }else{
            res.sendStatus(404)
        }
        
    }
})

app.post("/auth",(req, res) => {
    
    var {email, password} = req.body

    if(email != undefined){

        var user = DB.users.find(u => u.email == email)
        if(user != undefined){

            if(user.password == password){
               
               jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'}, (err, token) => {
                   if(err){
                       res.status(400)
                       res.json({err: "Falha interna"})
                   }else{

                    res.status(200)
                    res.json({token: token})

                   }
               })//armazenamento de informação essenciais tipo id do usuario e email do usuario, chamado de payload
               
               
            }else{
                res.status(401)
                res.json({err: "CREDENCIAIS INVÁLIDAS"})
            }
        }else{
            res.status(404)
            res.json({err: "O E-MAIL ENVIADO NÃO EXISTE NA BASE DE DADOS"})
        }
    }else{
        res.status(400)
        res.send({err: "O E-MAIL ENVIADO É INVALIDO"})
        
    }
})



app.listen(45679,()=> {
    console.log("API RODANDO!")
})