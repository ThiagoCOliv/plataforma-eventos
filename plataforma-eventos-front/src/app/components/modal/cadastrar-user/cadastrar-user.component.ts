import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

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

  cadastroRealizado = output<string>();

  onSubmit() 
  {
    console.log(this.profileForm.value);
    this.cadastroRealizado.emit("email");
  }
}