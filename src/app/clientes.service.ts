import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient ) { }

  getCliente() : Cliente {
    let cliente : Cliente = new Cliente();
    cliente.nome = 'Marcelo Tonon';
    cliente.cpf = '111.111.111-11';
    return cliente;
  }
}
