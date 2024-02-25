import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Cliente} from '../cliente'
import { ClientesService } from 'src/app/clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor( 
    private service: ClientesService,
    private router: Router ) {}

  ngOnInit(): void {
    this.service.getListaClientes()
      .subscribe(resposta => {this.clientes = resposta});
  }

  novoCliente() {
    this.router.navigate(['/clientes/novo'])
  }

  prepararExclusao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  excluirCliente() {
    if(this.clienteSelecionado) {
      this.service
      .excluir(this.clienteSelecionado)
      .subscribe( response => {
        this.mensagemSucesso = 'Cliente excluído com sucesso!',
        this.ngOnInit();
      }, errorReponse => {
        this.mensagemErro = 'Ocorreu um erro ao tentar excluir o Cliente!'
      })
    }
  }
}
