import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactCreatePage } from './contact-create.page';

describe('ContactCreatePage', () => {
  let component: ContactCreatePage;
  let fixture: ComponentFixture<ContactCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
