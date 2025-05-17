import { Component, Input, OnDestroy, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/User.interface';

@Component({
  selector: 'app-cadastrar-user-mensagem',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-user-mensagem.component.html',
  styleUrl: './cadastrar-user-mensagem.component.scss'
})

export class CadastrarUserMensagemComponent implements OnInit, OnDestroy
{
  userCadastrado: User = JSON.parse(sessionStorage.getItem('user') || '{}');
  closeModal = output();
  accountValidated = output<boolean>();

  private httpSubscriptions: Subscription[] = [];

  btnReenviarEmailIsDisabled: boolean = true;

  constructor(private readonly service: UserService) { }

  ngOnDestroy(): void 
  {
    this.httpSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.httpSubscriptions = [];
  }

  ngOnInit(): void 
  {
    this.desativarBotaoReenviarEmail();
  }

  validationForm: FormGroup = new FormGroup({ number: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999999)]) });

  fecharModal() 
  {
    this.closeModal.emit();
  }

  onSubmit()
  {
    if(this.validationForm.valid) 
    {
      this.httpSubscriptions.push(this.service.validateUser(this.validationForm.value.number as number)
        .subscribe(res => res.status === 200 ? this.accountValidated.emit(true) : console.error("Erro ao validar usuário:", res)));
      this.validationForm.reset();
    } 
    else 
    {
      alert("Número de validação inválido.");
    }
  }

  reenviarEmail()
  {
    this.httpSubscriptions.push(this.service.getValidationNumber().subscribe(res => res.status === 200 ? alert('Verifique seu email') : console.error("Erro ao reenviar email:", res)));
    this.desativarBotaoReenviarEmail();
  }

  desativarBotaoReenviarEmail()
  {
    this.btnReenviarEmailIsDisabled = true;
    setTimeout(() => this.btnReenviarEmailIsDisabled = false, 60000);
  }
}
