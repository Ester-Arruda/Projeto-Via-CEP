//lida com a lógica

import { getJson } from "./request-service.js";
import Address from "../models/address.js";

export async function findByCep(cep) {

    const url = `https://viacep.com.br/ws/${cep}/json/`;      //cria a url
    const result = await getJson(url);                      //faz fetch e retorna o json com chave e valor

    const address = new Address(result.cep, result.logradouro, null, result.localidade);
    //acessa o json e sua chave result.chave e coloca na ordem que está no obj

    return address;
}

export function getErrors(address) {
 const errors = {}

 if(!address.cep || address.cep == "") {
    errors.cep = "Campo requerido.";
 }

 if(!address.number || address.number == "") {
    errors.number = "Campo requerido.";
 }

 return errors
}

