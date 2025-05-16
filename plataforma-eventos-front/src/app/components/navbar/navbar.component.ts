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
  userIsLogged: boolean = false;

  dialogsOpen = {
    login: false,
    cadastro: false,
    cadastroValidation: false
  }

  user!: User;

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
    this.user.email = obj.user.email as string;
    this.user.name = obj.user.name as string;
    this.user.password = obj.user.password as string;
    localStorage.setItem('token_jwt', obj.res.body.token as string);
    this.abrirModal('cadastroValidation');
  }

  login()
  {
    this.userIsLogged = true;
    this.fecharModais();
  }
}
