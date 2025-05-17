import { Component } from '@angular/core';
import { LoginComponent } from "../modal/login/login.component";
import { CadastrarUserComponent } from "../modal/cadastrar-user/cadastrar-user.component";
import { CadastrarUserMensagemComponent } from "../modal/cadastrar-user-mensagem/cadastrar-user-mensagem.component";
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, CadastrarUserComponent, CadastrarUserMensagemComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent 
{
  userIsLogged: boolean = localStorage.getItem('jwt_token') ? true : false;
  username: string = localStorage.getItem('username') || '';

  dialogsOpen = {
    login: false,
    cadastro: false,
    cadastroValidation: false
  }

  abrirModal(modal: string) 
  {
    Object.keys(this.dialogsOpen).forEach((key) => this.dialogsOpen[key as keyof typeof this.dialogsOpen] = key == modal ? true : false);
  }

  fecharModal(modal: string) 
  {
    this.dialogsOpen[modal as keyof typeof this.dialogsOpen] = false;
  }

  fecharModais() 
  {
    Object.keys(this.dialogsOpen).forEach((key) => this.dialogsOpen[key as keyof typeof this.dialogsOpen] = false);
  }

  exibirModalValidacao(obj: any)
  {
    sessionStorage.setItem('user', JSON.stringify(obj.user));
    sessionStorage.setItem('jwt_token', obj.res.body.token as string);
    this.abrirModal('cadastroValidation');
  }

  login()
  {
    this.userIsLogged = true;
    localStorage.setItem('username', JSON.parse(sessionStorage.getItem('user') || '{}').name);
    localStorage.setItem('jwt_token', sessionStorage.getItem('jwt_token') || '');
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user');
    this.username = localStorage.getItem('username') || '';
    this.fecharModais();
  }
}
