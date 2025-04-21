import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-cadastrar-user',
  standalone: true,
  imports: [],
  templateUrl: './cadastrar-user.component.html',
  styleUrl: './cadastrar-user.component.scss'
})

export class CadastrarUserComponent 
{
  @Input() open: boolean = false;
  cancelar = output();

  close() 
  {
    this.cancelar.emit();
  }
}
