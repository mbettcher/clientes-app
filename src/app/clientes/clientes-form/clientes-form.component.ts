import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  mostrarMsgSucesso: boolean = false;
  errors: String[] = [];
  idCliente!: number;

  constructor(
     private service: ClientesService,
     private router: Router,
     private activatedRouter: ActivatedRoute ){
    this.cliente = new Cliente;
  }

  ngOnInit(): void {  

    let params: Observable<Params> = this.activatedRouter.params;
    params.subscribe({
      next: (urlParams) => {
        this.idCliente = urlParams['id'];
        if(this.idCliente) {
          this.service
            .getClienteById(this.idCliente)
            .subscribe({
              next: (response) => {
                this.cliente = response;
              },
              error: (erro) => {
                this.cliente = new Cliente;
                this.errors = erro.error.errors;
              }
            })
        }
      }
    })
  }

  onSubmit(){
   
    if(this.idCliente) {
      
      this.service
        .atualizar(this.cliente)
        .subscribe({
          next: (response) => {
            this.mostrarMsgSucesso = true;
            this.errors = [];
          },
          error: (erro) => {
            this.mostrarMsgSucesso = false;
            this.errors = ['Erro ao tentar atualizar o cliente!'];
          }
        }) 

    } else {
      this.service
        .salvar(this.cliente)
        .subscribe({
          next: (response) => {
            this.mostrarMsgSucesso = true;
            this.errors = [];
            this.cliente = response;
          },
          error: (erro) => {
            this.mostrarMsgSucesso = false;
            this.errors = erro.error.errors;
          }
        })
    }
  }

  limparFormulario(){
    this.cliente = new Cliente;
    this.mostrarMsgSucesso = false;
    this.errors = [];
    this.router.navigate(['/clientes/lista'])
  }
}
