import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient ) { }

  salvar(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente);
  }
  
  getListaClientes() : Observable<any[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }

  getClientePorId(id: number) : Observable<Cliente> {
    return this.http.get<any>(`http://localhost:8080/api/clientes/${id}`)
  }

  atualizarCliente(cliente: Cliente) : Observable<any> {
    return this.http.put<Cliente>(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
  }

  excluir(cliente: Cliente) : Observable<any> {
    return this.http.delete<Cliente>(`http://localhost:8080/api/clientes/${cliente.id}`);
  }

  verificaClienteJaCadastrado(cpf: string) : Observable<any> {
    return this.http.get<Boolean>(`http://localhost:8080/api/clientes/verificar/${cpf}`);
  }
}
