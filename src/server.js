const express = require("express")
const server = express()

//configurar a pasta publica
server.use(express.static("public"))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//Configurar caminhos da aplicação
//página inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um titulo"})
})

server.get("/creat-point", (req, res) => {
   return res.render("creat-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
 })


//Ligar o servidor
server.listen(3000)