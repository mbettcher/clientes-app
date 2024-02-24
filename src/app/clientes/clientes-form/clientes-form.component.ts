import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
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
  idCliente: number;

  constructor( 
    private service: ClientesService, 
    private router: Router,
    private activatedRoute: ActivatedRoute ) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    
    let params = this.activatedRoute.params;
  
    if(params && params['_value'].id) {
      this.idCliente = params['_value'].id;
      this.service
        .getClientePorId(this.idCliente)
        .subscribe(
          response => {this.cliente = response},
          errorResponse => {this.errors = errorResponse.error.errors}        
        )
    }
  }

 onSubmit() {
    if(this.idCliente){
    
      this.service
       .atualizarCliente(this.cliente)
       .subscribe(reponse => {
        this.sucesso = true;
        this.errors = [];
       }, errorResponse => {
        this.sucesso = false;
        this.errors = errorResponse.error.errors;
       })
    
    } else {
      
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
  }

  voltar(){
    this.router.navigate(['/clientes/listar'])
  }
}
