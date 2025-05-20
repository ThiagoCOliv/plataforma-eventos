import { Component, OnDestroy, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  closeModal = output();
  abrirModalCadastro = output();
  loginSuccess = output();

  private httpSubscription?: Subscription;

  constructor(private readonly service: UserService) { }

  ngOnDestroy(): void 
  {
    this.httpSubscription?.unsubscribe();
  }

  loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  close() 
  {
    this.closeModal.emit();
  }

  cadastrar()
  {
    this.abrirModalCadastro.emit();
  }

  onSubmit()
  {
    if(this.loginForm.valid) 
    {
      this.httpSubscription = this.service.loginUser(this.loginForm.value).subscribe(res => {
        if(res.status === 200) 
        {
          localStorage.setItem('username', res.body.user.name as string);
          localStorage.setItem('jwt_token', res.body.token as string);
          this.loginForm.reset();
          this.loginSuccess.emit();
        } 
        else 
        {
          alert("Erro ao fazer login. Verifique suas credenciais.");
        }
      });
    } 
    else 
    {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  }
}
