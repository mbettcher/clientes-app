import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  sucesso: boolean = false;
  errors: String[] = [];

  constructor( private service: ClientesService, private router: Router ) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

 onSubmit() {
    this.service
      .salvar(this.cliente)
      .subscribe(response => {
        this.sucesso = true;
        this.errors = [];
        this.cliente = response;
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.sucesso = false;
      });
  }

  voltar(){
    this.router.navigate(['/clientes/listar'])
  }
}
