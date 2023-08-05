import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service'
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  mostrarMsgSucesso: boolean = false;
  errors: string[] = [];

  constructor(
    private clientesService: ClientesService,
    private service: ServicoPrestadoService 
  ) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
      this.clientesService.listarClientes().subscribe({
        next: (response) => {
          this.clientes = response;
        }
      })
  }

  onSubmit(){
    this.service
      .salvar(this.servicoPrestado)
      .subscribe({
        next: (response) => {
          this.mostrarMsgSucesso = true;
          this.errors = [];
          this.servicoPrestado = new ServicoPrestado();
        },
        error: (errorResponse) => {
          this.mostrarMsgSucesso = false;
          this.errors = errorResponse.error.errors;
        }
      })
  }

}
