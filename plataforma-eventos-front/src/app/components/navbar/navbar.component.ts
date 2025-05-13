import { Component } from '@angular/core';
import { LoginComponent } from "../modal/login/login.component";
import { CadastrarUserComponent } from "../modal/cadastrar-user/cadastrar-user.component";
import { CadastrarUserMensagemComponent } from "../modal/cadastrar-user-mensagem/cadastrar-user-mensagem.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, CadastrarUserComponent, CadastrarUserMensagemComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent 
{
  dialogsOpen = {
    login: false,
    cadastro: false,
    cadastroValidation: false
  }

  email: string = '';

  abrirModal(modal: string) 
  {
    Object.keys(this.dialogsOpen).forEach((key) => this.dialogsOpen[key as keyof typeof this.dialogsOpen] = key == modal ? true : false);
  }

  fecharModal(modal: string) 
  {
    this.dialogsOpen[modal as keyof typeof this.dialogsOpen] = false;
  }

  exibirModalValidacao(obj: any)
  {
    this.email = obj.email as string;
    localStorage.setItem('token_jwt', obj.res.body.token as string);
    this.abrirModal('cadastroValidation');
  }
}
