function State () {                             
    this.listSection = null;                                         //crio obj e atributo vazio
}

const state = new State();                                           // instancio

export function init() {
    state.listSection = document.querySelector("#list-section");      //pegando elemento section e passando como attr
}

export function addCard(address) {
    const card = createCard(address);
    state.listSection.appendChild(card);
}

function createCard(address) {   //cria o card
    const div = document.createElement('div');
    div.classList.add("card-list-item");

    const h3 = document.createElement('h3');
    h3.innerHTML = address.city;

    const line = document.createElement('p');
    line.classList.add("address-line");
    line.innerHTML = `${address.street}, ${address.number}`;

    const cep = document.createElement('p');
    cep.classList.add('address-cep');
    cep.innerHTML = address.cep;
    
    div.appendChild(h3);
    div.appendChild(line);
    div.appendChild(cep);
    
    return div
}