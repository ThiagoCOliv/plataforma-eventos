import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUserMensagemComponent } from './cadastrar-user-mensagem.component';

describe('CadastrarUserMensagemComponent', () => {
  let component: CadastrarUserMensagemComponent;
  let fixture: ComponentFixture<CadastrarUserMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarUserMensagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarUserMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
