import { Component } from '@angular/core';
import { LoginComponent } from "../modal/login/login.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent 
{
  dialogsOpen = {
    login: false,
    cadastro: false,
    cadastroMessage: false
  }

  abrirModal(modal: string) 
  {
    Object.keys(this.dialogsOpen).forEach((key) => this.dialogsOpen[key as keyof typeof this.dialogsOpen] = key == modal ? true : false);
  }
}
