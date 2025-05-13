import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/User.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastrar-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-user.component.html',
  styleUrl: './cadastrar-user.component.scss'
})

export class CadastrarUserComponent 
{
  constructor(private readonly service: UserService) { }

  cancelar = output();
  private httpSubscription?: Subscription;

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  close() 
  {
    this.cancelar.emit();
  }

  cadastroRealizado = output<object>();

  onSubmit() 
  {
    if(this.profileForm.value.password !== this.profileForm.value.confirmPassword) 
    {
      alert("As senhas não coincidem.");
      return;
    }
    
    this.httpSubscription = this.service.postUser(this.profileForm.value as User).subscribe(res => {
      if(res.status === 201)
      {
        const emit = { email: this.profileForm.value.email, res };
        this.profileForm.reset();
        this.cadastroRealizado.emit(emit);
      }
      else
      {
        console.error("Erro ao cadastrar usuário:", res);
      }
    });
  }

  ngOnDestroy(): void
  {
    this.httpSubscription?.unsubscribe();
  }
}