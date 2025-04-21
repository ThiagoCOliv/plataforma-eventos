import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() open: boolean = false;
  closeModal = output();
  abrirModalCadastro = output();

  close() 
  {
    this.closeModal.emit();
  }

  cadastrar()
  {
    this.abrirModalCadastro.emit();
  }
}
