import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  loginError: boolean = false;
  novoUsuario: boolean = false;

  constructor(
    private router: Router
  ){ }

  onSubmit(){
    this.router.navigate(['/home'])
  }

  prepararCadastro(event: any){
    event.preventDefault();
    this.novoUsuario = true;
  }

  cancelarCadastro(){
    this.novoUsuario = false;
  }

}
