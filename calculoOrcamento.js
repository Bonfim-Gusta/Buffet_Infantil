const garcom = 50
const monitor = 40
const cardapio = ["mini-pizza 0,80", "mini-pasteis 2,50", "batata-frita 0,80", "mandioca 0,50", "polenta 0,40", "anel-de-cebola 0,80", "coxinha 1,50", "bolinha-de-queijo 1,50", "risoles-de-pizza 1,20", "croquete-de-carne 1,00", "quibe 1,00", "saladas 0,30", "cachorro-quente 3,70", "batata-ao-molho 2,20", "batata-baby 2,50", "tabua-de-frios 1,90", "iscas-de-frango 3,80", "macarrao 1,05", "arroz 1,90", "calabresa 0,10", "linguica 0,65", "cupim 8,50", "contra-file 11,50", "frango-assado 9,80"]
const bebida = 8

class ValorOrcamento
{
    constructor(comidas, qtdAdulto, qtdCrianca, tempoFesta)
    {
        this.comidas = comidas
        this.qtdAdulto = qtdAdulto
        this.qtdCrianca = qtdCrianca
        this.tempoFesta = tempoFesta
    }

    validaDados()
    {
        let qtdAlimentos = 0
        //Percorre os checkbox, verificando quantas opções foram preenchidas
        this.comidas.forEach(comida => {
            for(let c in cardapio)
            {
                if(comida.split(" ")[0] === cardapio[c].split(" ")[0])
                {
                    qtdAlimentos++
                }
            }
        })

        let inputs = [this.qtdAdulto, this.qtdCrianca, this.tempoFesta]
        let naoPreenchidos = 0
        //Verifica se algum outro input nao foi preenchido
        for(let i in inputs)
        {
            if(inputs[i] == undefined || inputs[i] == "" || inputs[i] == null)
            {
                naoPreenchidos++
            }
        }

        return(qtdAlimentos >= 10 && naoPreenchidos === 0 && this.qtdAdulto <= 100 && this.qtdCrianca <= 40)
    }

    calculoOrcamento()
    {
        let custoGarcons = 0
        if(this.qtdAdulto > 0 && this.qtdAdulto <= 15)
        {
            custoGarcons = 2 * garcom
        }
        if(this.qtdAdulto >= 16 && this.qtdAdulto <= 30)
        {
            custoGarcons = 3 * garcom
        }
        if(this.qtdAdulto >= 31 && this.qtdAdulto <= 50)
        {
            custoGarcons = 4 * garcom
        }
        if(this.qtdAdulto >= 51 && this.qtdAdulto <= 70)
        {
            custoGarcons = 6 * garcom
        }
        if(this.qtdAdulto >= 71 && this.qtdAdulto <= 100)
        {
            custoGarcons = 8 * garcom
        }
        
        let custoMonitores = 0
        if(this.qtdCrianca > 0 && this.qtdCrianca <= 15)
        {
            custoMonitores = 5 * monitor
        }
        if(this.qtdCrianca >= 16 && this.qtdCrianca <= 20)
        {
            custoMonitores = 6 * monitor
        }
        if(this.qtdCrianca >= 21 && this.qtdCrianca <= 30)
        {
            custoMonitores = 7 * monitor
        }
        if(this.qtdCrianca >= 31 && this.qtdCrianca <= 40)
        {
            custoMonitores = 9 * monitor
        }

        let custoComidas = 0.00
        this.comidas.forEach( c => {
           custoComidas += (parseFloat(c.split(" ")[1].replace(",", ".") * this.qtdAdulto)) + (parseFloat(c.split(" ")[1].replace(",", ".") * (this.qtdCrianca / 2)))
        })

        let custoBebidas = 0
        let totalPessoas = this.qtdCrianca + this.qtdAdulto
        if(totalPessoas > 0 && totalPessoas <= 20)
        {
            custoBebidas = 3 * bebida
        }
        if(totalPessoas > 20 && totalPessoas <= 40)
        {
            custoBebidas = 6 * bebida
        }
        if(totalPessoas > 40 && totalPessoas <= 60)
        {
            custoBebidas = 9 * bebida
        }
        if(totalPessoas > 60 && totalPessoas <= 80)
        {
            custoBebidas = 12 * bebida
        }
        if(totalPessoas > 60 && totalPessoas <= 80)
        {
            custoBebidas = 15 * bebida
        }
        if(totalPessoas > 80 && totalPessoas <= 100)
        {
            custoBebidas = 18 * bebida
        }

        let custoHoras = 0
        if(this.tempoFesta === "4")
        {
            custoHoras = 300
        }

        const percentualLucro = 1.35

        let custoTotal = ((custoComidas + custoBebidas + custoGarcons + custoMonitores) * percentualLucro) + custoHoras
        return custoTotal
    }
}

function comidasSelecionadasComPreco()
{
    let comidasSelecionadas = []
    document.querySelectorAll('.cardapio').forEach(c => {
        if(c.checked) //Verifica quais opções foram selecionas e as armazenas em um array
        {
            comidasSelecionadas.push(c.id)
        }
    })

    let comidasSelecionadasComPreco = []
    comidasSelecionadas.forEach(c => {
        for(let i in cardapio)
        {
            if(cardapio[i].split(" ")[0] == c) //Compara os itens da array de comidas selecionadas, percorrendo as opções de cardápio, para selecionar as opções com seu preço
            {
                comidasSelecionadasComPreco.push(cardapio[i])
            }
        }
    })

    return comidasSelecionadasComPreco
}

function realizarOrcamento()
{
    document.getElementById('valorOrcamento').innerHTML = ""
    let comidas_selecionadas_com_preco = comidasSelecionadasComPreco()
    let qtdAdulto = document.getElementById('qtd-adulto')
    let qtdCrianca = document.getElementById('qtd-crianca')
    let tempoFesta = document.getElementById('tempo-festa')

    let arrayAtributos = [
        qtdAdulto,
        qtdCrianca,
        tempoFesta
    ]

    let valor = new ValorOrcamento(comidas_selecionadas_com_preco, qtdAdulto.value, qtdCrianca.value, tempoFesta.value)
    ///Verificação da validação dos dados
    if(valor.validaDados() === false) //Se falso, exibe o modal de aviso, e deixa vermelho os campos restantes
    {
        $('#modalFaltamDados').modal('show')
        modalFaltamDados('modal-header bg-primary', 'Aviso!', 'Informe no mínimo 10 opções de cardápio e no máximo 100 adultos e 40 crianças', 'btn btn-primary', 'Ok', '')

        for(let i in arrayAtributos)
        {
            if(arrayAtributos[i].value === "")
            {
                arrayAtributos[i].style.border = "1px solid red"
            }
        }

        document.getElementById("texto-requisitos").style.color = "red"
    }
    else //Se verdadeiro, faz a animação de carregamento e exibe na tela o valor do orçamento
    {
        let carregando = document.createElement('span')
        carregando.style.display = 'block'
        carregando.style.width = '30px'
        carregando.style.height = '30px'
        carregando.style.backgroundColor = 'transparent'
        carregando.style.border = '3px solid #fff'
        carregando.style.borderTop = '3px solid transparent'
        carregando.style.borderRadius = '50%'
        carregando.style.margin = '0 auto'
        carregando.style.animation = 'loading 1.5s ease-in-out infinite'
        document.getElementById('festa').append(carregando)

        let tempo = 3
        setInterval(function(){
            tempo--
            if(tempo === 0)
            {
                document.getElementById('btn-fazer-orcamento').style.display = 'none'
                document.getElementById('botao-refazer').style.display = "block"
                carregando.style.display = 'none'
                document.getElementById('valorOrcamento').innerHTML = valor.calculoOrcamento().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
            }
        },1000)
    }   
}

function refazerOrcamento()
{
    window.location.reload()
}

function avisoDidatico()
{
    $('#modalFaltamDados').modal('show')
    modalFaltamDados('modal-header bg-warning', 'Aviso!', 'Este é um projeto com fins didáticos e de enriquecimento de portifólio!<br>Apesar de buscar chegar o mais próximo possível dos valores, eles não são compatíveis com a realidade<br>Para um orçamento mais preciso, entre em contato com o buffet, pelo whatsapp<br> <a style="color:green;" href="https://api.whatsapp.com/send?phone=5519981966848&fbclid=PAAaZ9GIikL2sejEMKeoGRtu1QZc85oV7dpzL3x0_d9GGQsbJigpEBAgbZByw">Mande sua mensagem <i class="fa-brands fa-whatsapp"></i></a>', 'btn btn-warning text-light', 'Ok', '')
}

function modalFaltamDados(bgTitle, title, msg, btnColor, textBtn, campos_restantes)
{
    document.querySelector('#modalFaltamDados #modal-header').className = bgTitle
    document.querySelector('#modalFaltamDados .modal-title').innerHTML = title
    document.querySelector('#modalFaltamDados .modal-recado').innerHTML = msg
    document.querySelector('#modalFaltamDados #botaoModal').className = btnColor
    document.querySelector('#modalFaltamDados #botaoModal').innerHTML = textBtn
    document.querySelector('.campos_restantes').innerHTML = campos_restantes
}

function removeBorda(id)
{
    document.getElementById(id).style.border = '1px solid white'
}

function removeCorAviso()
{
    document.getElementById("texto-requisitos").style.color = "white"
}