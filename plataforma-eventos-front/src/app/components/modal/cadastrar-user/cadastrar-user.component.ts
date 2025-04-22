import { Component, Input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-user.component.html',
  styleUrl: './cadastrar-user.component.scss'
})

export class CadastrarUserComponent 
{
  cancelar = output();

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  })

  close() 
  {
    this.cancelar.emit();
  }

  cadastroRealizado = output<string>();

  onSubmit() 
  {
    let email = 'email@gmail.com';
    console.log(email);
    this.cadastroRealizado.emit(email);
  }
}
