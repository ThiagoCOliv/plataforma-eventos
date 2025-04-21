import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUserComponent } from './cadastrar-user.component';

describe('CadastrarUserComponent', () => {
  let component: CadastrarUserComponent;
  let fixture: ComponentFixture<CadastrarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
