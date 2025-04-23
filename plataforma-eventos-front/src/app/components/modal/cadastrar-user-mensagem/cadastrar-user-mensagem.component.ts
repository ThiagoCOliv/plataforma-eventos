import { Component, Input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-user-mensagem',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-user-mensagem.component.html',
  styleUrl: './cadastrar-user-mensagem.component.scss'
})

export class CadastrarUserMensagemComponent 
{
  @Input() emailCadastrado: string = '';
  closeModal = output();

  validationForm = new FormGroup({ number: new FormControl(0, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]) });

  fecharModal() 
  {
    this.closeModal.emit();
  }

  onSubmit() 
  {
    throw new Error('Method not implemented.');
  }
}
