function exibeFotos()
{
    if(document.getElementById("select-estrutura").value === "cardapio")
    {
        limpaFotos()
        document.querySelector('h1').innerHTML = "Cardápio"
        let opcoes_cardapio = ["Mini pizza", "Frios", "Cachorrro Quente", "Macarrão", "Iscas de frango", "Calabresa", "Mini pastéis", "Esfirra de carne", "Bolinha de queijo", "Coxinha", "Risole de pizza", "Croquete de Carne", "Batata frita", "Polenta frita", "Anel de Cebola", "Mandioca"]

        document.getElementById('ul').innerHTML = ""
        opcoes_cardapio.forEach(c => {
            let itemLista = document.createElement('li')
            itemLista.innerHTML = c
            document.getElementById('ul').appendChild(itemLista)
        })

        let carousel_inner = document.querySelector('#carousel-inner')
        for(let i = 1; i <= 16; i++)
        {
            var ol = document.querySelector('.carousel-indicators')
            var li = document.createElement('li')
            li.attributes.dataTarget = "#fotos"
            li.attributes.dataSlideTo = (i - 1)
            var carousel_item = document.createElement('div')
            carousel_item.className = "carousel-item"
            if(i === 1)
            {
                carousel_item.classList.add('active')
                li.className = 'active'
            }
            var foto_cardapio = document.createElement('img')
            foto_cardapio.className = "foto-cardapio"
            foto_cardapio.src = 'imagens/cardapio/cardapio-' + i + '.jpeg'
            carousel_inner.append(carousel_item)
            carousel_item.append(foto_cardapio)
            ol.appendChild(li)
        }
    }
    else
    {
        limpaFotos()
        document.querySelector('h1').innerHTML = "Brinquedos"
        let opcoes_brinquedos = ["Playground", "Basquete", "Tombo", "Boliche", "Pula-pula" ,"Touro Mecanico", "Hockey", "Carrossel", "Basquetoy", "Campo de futebol"]

        document.getElementById('ul').innerHTML = ""
        opcoes_brinquedos.forEach(c => {
            let itemLista = document.createElement('li')
            itemLista.innerHTML = c
            document.getElementById('ul').appendChild(itemLista)
        })

        let carousel_inner = document.querySelector('#carousel-inner')
        for(let i = 1; i <= 11; i++)
        {
            var ol = document.querySelector('.carousel-indicators')
            var li = document.createElement('li')
            li.attributes.dataTarget = "#fotos"
            li.attributes.dataSlideTo = (i - 1)
            var carousel_item = document.createElement('div')
            carousel_item.className = "carousel-item"
            if(i === 1)
            {
                carousel_item.classList.add('active')
                li.className = 'active'
            }
            var foto_cardapio = document.createElement('img')
            foto_cardapio.className = "foto-brinquedos"
            foto_cardapio.src = 'imagens/brinquedos/brinquedos-' + i + '.jpeg'
            carousel_inner.append(carousel_item)
            carousel_item.append(foto_cardapio)
            ol.appendChild(li)
        }
    }

}

function limpaFotos()
{
    let items = document.querySelectorAll('.carousel-item')
    items.forEach(i => {
        i.remove()
    })

    let indicators = document.querySelectorAll('ol li')
    indicators.forEach(i => {
        i.remove()
    })
}

function alteraFotos()
{
    var select = document.getElementById('select-estrutura'); 
    select.addEventListener('change', exibeFotos())
}

function carregarOpcoesCardapio()
{
    avisoDidatico()
    let cardapio_pt1 = document.querySelector('.cardapio-pt1')
    let cardapio_pt2 = document.querySelector('.cardapio-pt2')
    let cont = 0
    cardapio.forEach(c => {
        let div = document.createElement('div')
        let label = document.createElement('label')
        label.innerHTML = c.split(" ")[0].replaceAll("-", " ").replace(c[0], c[0].toUpperCase())
        let input = document.createElement('input')
        input.type = "checkbox"
        input.className = "cardapio"
        input.id = c.split(" ")[0]
        cont++

        if(cont <= 12)
        {
            cardapio_pt1.appendChild(div)
            div.appendChild(label)
            div.appendChild(input)
        }
        else
        {
            cardapio_pt2.appendChild(div)
            div.appendChild(label)
            div.appendChild(input)
        }
    })
}

/* BackEnd que recuperaria o tamanho do diretório para percorrer as fotos
const fs = require('fs');
function tamanhoDiretorio(diretorio, arquivos)
{
    if(!arquivos)
    {
        arquivos = []
    }
    let listaDeArquivos = fs.readdirSync(diretorio)
    for(let k in listaDeArquivos)
    {
       arquivos.push(listaDeArquivos[k])    
    }    
    return arquivos.length
}

let teste = tamanhoDiretorio("./imagens/brinquedos/")
console.log(teste)

*/