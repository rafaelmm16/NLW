
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
        }

    } )
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedSpace = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedSpace].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disable = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 
        }

        citySelect.disable = false
    } )
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

/*Itens de coleta */

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let items of itemsToCollect ){
    items.addEventListener("click", handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){

    const itemLi = event.target

    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //Verificar se existe itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itenFound = item == itemId //Isso ira ser 0/1
        return itenFound
    })

    //adicionar ou tirar se já existir
    if(alreadySelected >= 0){
     const filteredItems = selectedItems.filter(item => {
         const itemIsDifferent = item != itemId //false
         return itemIsDifferent
     })

     selectedItems = filteredItems
    }else{
        //add se não estiver no array
        selectedItems.push(itemId)
    }

    //Atualizar o campo com os itens selecionados

   collectedItems.value = selectedItems
    
}