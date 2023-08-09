const readLine = require("readline")
const fs = require("fs")
const Event = require("events")
const eventEmmit = new Event()
const leitor = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})

//Funções
function iniciarPrograma(){
    leitor.question("Digite o nome do arquivo: ", function(nomeArquivo){
        if (nomeArquivo  != "arquivo.txt"){
            eventEmmit.emit("Nome Inválido")
        }
        else {
            eventEmmit.emit("Arquivo.txt")
        }
    })
}
function perguntarNovamente(){
    leitor.question("Deseja executar novamente? ", function(resposta){
        if (resposta.toUpperCase() == "S"){
            eventEmmit.emit("RespostaSim")
        }
        else if(resposta.toUpperCase() == "N"){
            eventEmmit.emit("RespostaNao")
        }
})
}
function exibirResumo(){
    fs.readFile("arquivo.txt", "utf8",(err,data)=>{
        if(err){
            console.error(err)
            return
        }

        let arr = data.replace(/\r/g,"")
        let novoArr = arr.split("\n")
        let linhasTexto = 0      
        let linhasNumeros = 0
        let soma = 0

       for(let x = 0; x < novoArr.length; x++){
         let novaLista = parseInt(novoArr[x])
           if(!isNaN(novaLista)){
              soma+= novaLista
             linhasNumeros++
           }
         else{               
            linhasTexto++
        }
        }  
        console.time("Tempo de Execução: ")
        console.log(`**********************************************`)
        console.log(`Soma dos números: ${soma}`)
        console.log(`Número de linha com números: ${linhasNumeros}`)
        console.log(`Número de linha com texto: ${linhasTexto}`) 
        console.log(`**********************************************`)  
        console.timeEnd("Tempo de Execução: ") 
    })
}

//Eventos

eventEmmit.on("Arquivo.txt", ()=>{
    exibirResumo()
    setTimeout(() => {
        perguntarNovamente();
      }, 2000);
} )

eventEmmit.on("Nome Inválido",()=>{
    console.log("Nome inválido")
    iniciarPrograma()
})
eventEmmit.on("RespostaSim", () =>{
    iniciarPrograma()
})
eventEmmit.on("RespostaNao", () =>{
    console.log("Saindo do programa....")
    setTimeout(() => {
        console.log("Programa encerrado")}, 1000)
    leitor.close()
})
iniciarPrograma()