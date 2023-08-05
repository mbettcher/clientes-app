import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent {

  clientes: Cliente[] = [];
  clienteSelecionado!: Cliente;
  mensagemSucesso: string = '';
  mensgaemErro: string = '';

  constructor(
    private service: ClientesService, 
    private router: Router) {}

  ngOnInit(): void{ 
    this.service
      .listarClientes()
      .subscribe({
        next: (response) => {
          this.clientes = response;
        }
      })
   }

   novoCadastro() {
    this.router.navigate(['/clientes/form'])
   }

   preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
   }

   deletarCliente(){
    this.service
      .deletar(this.clienteSelecionado)
      .subscribe({
        next: (response) =>{
          this.mensagemSucesso = 'Cliente deletado com sucesso!'
          this.ngOnInit();
        },
        error: (response) => {
          this.mensgaemErro = 'Ocorreu um erro ao tentar deletar o cliente.'
        }
      })
   }

}
