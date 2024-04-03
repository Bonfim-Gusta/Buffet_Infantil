function exibeFotos()
{
    //Capturar o value do Select para controlar o que será exibido na tela
    if(document.getElementById("select-estrutura").value === "cardapio")//Se cardápio, aplica a lógica para carregar as fotos e textos das comidas
    {
        limpaFotos()
        document.querySelector('h1').innerHTML = "Cardápio"
        let opcoes_cardapio = ["Mini pizza", "Frios", "Cachorrro Quente", "Macarrão", "Iscas de frango", "Calabresa", "Mini pastéis", "Esfirra de carne", "Bolinha de queijo", "Coxinha", "Risole de pizza", "Croquete de Carne", "Batata frita", "Polenta frita", "Anel de Cebola", "Mandioca"]

        document.getElementById('ul').innerHTML = ""
        //forEach Percorre a array de opções do cardápio criando uma li dentro da ul que recebe como conteúdo a opção de comida
        opcoes_cardapio.forEach(c => {
            let itemLista = document.createElement('li')
            itemLista.innerHTML = c
            document.getElementById('ul').appendChild(itemLista)
        })

        //Lógica que cria a estrutura HTML para exibir as fotos em carousel e os indicators
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
    else //Se não for cardápio, aplica a lógica para carregar as fotos e textos dos brinquedos
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

function limpaFotos() //Função para limpar todos o conteudo adiocionado, para que seja criado o outro, na troca do select
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

function alteraFotos() //Função chamada que captura o evento de mudança do select e exibe as fotos
{
    var select = document.getElementById('select-estrutura'); 
    select.addEventListener('change', exibeFotos())
}

function carregarOpcoesCardapio() //Função que exibe na tela a estrutura de labels e inputs para fazer a seleção das opções de cardápio (Por ter várias opções, a função usar um looping para fazer com que a estrutura no arquivo HTML não fique repetitivo)
{
    avisoDidatico() //Alert avisando que se trata de um projeto didático
    let cardapio_pt1 = document.querySelector('.cardapio-pt1')
    let cardapio_pt2 = document.querySelector('.cardapio-pt2')
    let cont = 0
    cardapio.forEach(c => {
        let div = document.createElement('div')
        let label = document.createElement('label')
        //Recupera os itens da array cardápio, separando o nome do preço, substituindo os "-" por " " e deixando a primeira letra maiúscula para exibir na tela
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