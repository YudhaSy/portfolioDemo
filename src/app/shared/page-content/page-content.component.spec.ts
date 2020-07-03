import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContentComponent } from './page-content.component';
import {FormBuilder} from "@angular/forms";

describe('PageContentComponent', () => {
  let component: PageContentComponent;
  let fixture: ComponentFixture<PageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageContentComponent
      ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup form', () => {
    expect(component.form).toBeUndefined();
    component.setForm();
    expect(component.form).not.toBeUndefined();
  });

  it('should not send submit data when form is invalid', () => {
    component.setForm();
    component.form.setErrors({invalid: true});
    spyOn(component.submit, 'emit').and.callFake(function() {});
    spyOn(component, 'resetForm').and.callFake(function() {});

    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(component.submit.emit).not.toHaveBeenCalled();
    expect(component.resetForm).not.toHaveBeenCalled();
  });

  it('should send submit data and reset form data when form is valid', () => {
    const payload = {name: 'John Doe', email: 'john@email.com', message: 'hello world!'};
    component.setForm();
    component.form.setValue(payload);
    component.dataItems = [{controlName: 'name'}, {controlName: 'email'}, {controlName: 'message'}];
    spyOn(component.submit, 'emit').and.callFake(function() {});
    spyOn(component, 'resetForm').and.callFake(function() {});

    component.onSubmit();

    expect(component.submit.emit).toHaveBeenCalledWith(payload);
    expect(component.resetForm).toHaveBeenCalledTimes(1);
  });

  it('should reset form and set submitted flag to false', () => {
    const payload = {name: 'John Doe', email: 'john@email.com', message: 'hello world!'};
    component.setForm();
    component.form.setValue(payload);
    component.submitted = true;

    component.resetForm();

    expect(component.submitted).toBeFalse();
    expect(component.form.value.name).toBeNull();
    expect(component.form.value.email).toBeNull();
    expect(component.form.value.message).toBeNull();
  });
});
