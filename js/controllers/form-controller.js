//contém eventos disparados pela ação do usuário
import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import * as listController from './list-controller.js'

function State() {  //cria obj e attr vazio

    this.address = new Address ();  //instancio obj criado em models/address.js      //2º obj (address)

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
};

//instancia obj
const state = new State();     //1º obj (state)

//passa valores ao obj
export function init () {    //pegando elementos do form e passando como attr
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]')

    state.inputNumber.addEventListener('keyup', handleInputNumberkeyup);
    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
}

function handleInputNumberkeyup(event) {
    state.address.number = event.target.value;
}

async function handleInputCepChange(event) {
    const cep = event.target.value;

    try {
        const address = await addressService.findByCep(cep);
        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.address = address;  //address do obj acima recebe o address que veio do address-service

        setFormError("cep", "");
        state.inputNumber.focus();
    } 
    catch (e) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("cep", "Informe um CEP válido");
    }
}

function handleBtnSaveClick (event) {
    event.preventDefault();

    const errors = addressService.getErrors(state.address);
    const keys = Object.keys(errors)  //pego as chaves do obj errors
    if(keys.length > 0){
        keys.forEach(key => {
            setFormError(key, errors[key])
        })
    }
    else {
        listController.addCard(state.address);     //1ºobj (state) 2ºobj (address) - accesse obj state acesse obj address
        clearForm();
    }
}

function handleBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

function handleInputNumberChange(event) {
    if(event.target.value == ""){
        setFormError("number", "campo requerido")
    }else {
        setFormError("number", "")
    }
}

function setFormError (dataError, message) {  //insere msg de erro na div de erro
    const element = document.querySelector(`[data-error="${dataError}"]`);
    element.innerHTML = message
}

function clearForm() {
    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.address = new Address();

    state.inputCep.focus()
}