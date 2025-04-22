import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-cadastrar-user-mensagem',
  standalone: true,
  imports: [],
  templateUrl: './cadastrar-user-mensagem.component.html',
  styleUrl: './cadastrar-user-mensagem.component.scss'
})

export class CadastrarUserMensagemComponent 
{
  @Input() emailCadastrado: string = '';
  closeModal = output();

  fecharModal() 
  {
    this.closeModal.emit();
  }
}
