import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarComponent } from './adicionar.component';

describe('AdicionarComponent', () => {
  let component: AdicionarComponent;
  let fixture: ComponentFixture<AdicionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
